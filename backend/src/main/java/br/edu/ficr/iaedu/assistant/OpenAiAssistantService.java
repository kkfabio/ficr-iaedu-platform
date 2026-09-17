package br.edu.ficr.iaedu.assistant;

import br.edu.ficr.iaedu.assistant.knowledge.FicrKnowledgeBase;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.messages.AssistantMessage;
import org.springframework.ai.chat.messages.Message;
import org.springframework.ai.chat.messages.SystemMessage;
import org.springframework.ai.chat.messages.UserMessage;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Profile({"openai", "gemini"})
public class OpenAiAssistantService implements AssistantService {

    private final ChatClient chatClient;
    private final FicrKnowledgeBase knowledgeBase;

    public OpenAiAssistantService(ChatClient.Builder chatClientBuilder, FicrKnowledgeBase knowledgeBase) {
        this.chatClient = chatClientBuilder.build();
        this.knowledgeBase = knowledgeBase;
    }

    private String getSystemPrompt() {
        return """
                Você é a assistente acadêmica oficial e inteligente da Faculdade Imaculada Conceição do Recife (FICR).
                Seu objetivo é orientar alunos, professores e visitantes sobre calendário, processos acadêmicos, prazos, contatos e funcionamento da faculdade.

                DIRETRIZES DE COMPORTAMENTO:
                1. Tom de voz: Cordial, acolhedor, profissional e prestativo. Sempre em português do Brasil.
                2. Base de conhecimento: Utilize estritamente as informações oficiais fornecidas abaixo para fundamentar suas respostas.
                3. Sem alucinações: NUNCA invente prazos, datas, telefones, e-mails ou regras financeiras que não constem na base.
                4. Encaminhamento humano: Se a pergunta envolver dados confidenciais ou individuais do estudante (ex: "qual é a minha nota?", "quanto devo de mensalidade?"), ou se o assunto não estiver na base, informe com gentileza que não possui acesso a dados pessoais e oriente a entrar em contato com a Secretaria Geral (secretaria@ficr.edu.br ou WhatsApp (81) 98765-4321).
                5. Formatação: Organize a resposta em parágrafos claros ou tópicos para facilitar a leitura em telas móveis e desktop.

                --- BASE OFICIAL DE CONHECIMENTO DA FICR ---
                """ + knowledgeBase.getInstitutionalContext();
    }

    @Override
    public String answer(String question) {
        return answer(question, List.of());
    }

    @Override
    public String answer(String question, List<ChatMessage> history) {
        List<Message> messages = new ArrayList<>();
        messages.add(new SystemMessage(getSystemPrompt()));

        if (history != null) {
            for (ChatMessage msg : history) {
                if ("assistant".equalsIgnoreCase(msg.role())) {
                    messages.add(new AssistantMessage(msg.content()));
                } else if ("user".equalsIgnoreCase(msg.role())) {
                    messages.add(new UserMessage(msg.content()));
                }
            }
        }

        messages.add(new UserMessage(question));

        return chatClient.prompt()
                .messages(messages)
                .call()
                .content();
    }
}
