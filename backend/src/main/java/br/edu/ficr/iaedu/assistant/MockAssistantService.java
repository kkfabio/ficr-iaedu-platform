package br.edu.ficr.iaedu.assistant;

import br.edu.ficr.iaedu.assistant.knowledge.FicrKnowledgeBase;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Profile("mock")
public class MockAssistantService implements AssistantService {

    private final FicrKnowledgeBase knowledgeBase;

    public MockAssistantService(FicrKnowledgeBase knowledgeBase) {
        this.knowledgeBase = knowledgeBase;
    }

    @Override
    public String answer(String question) {
        return answer(question, List.of());
    }

    @Override
    public String answer(String question, List<ChatMessage> history) {
        String q = question.toLowerCase();

        if (q.contains("agenda") || q.contains("aula") || q.contains("horário") || q.contains("horario")) {
            return "As aulas do semestre letivo da FICR iniciaram em 10/02/2026. Você pode consultar os horários de suas disciplinas e próximas entregas na página Agenda do portal.";
        }

        if (q.contains("comunicado") || q.contains("aviso") || q.contains("evento")) {
            return "Os comunicados oficiais e eventos institucionais (como a Feira de Projetos em 18 de setembro de 2026) estão reunidos na página Comunicados do portal.";
        }

        if (q.contains("secretaria") || q.contains("contato") || q.contains("telefone") || q.contains("whatsapp") || q.contains("email") || q.contains("e-mail")) {
            return "Você pode contatar a Secretaria Geral da FICR pelo e-mail secretaria@ficr.edu.br ou WhatsApp/Telefone (81) 98765-4321 / (81) 3210-9800. Atendimento de segunda a sexta das 08h às 21h30.";
        }

        if (q.contains("prova") || q.contains("avaliacao") || q.contains("avaliação") || q.contains("nota") || q.contains("média") || q.contains("media")) {
            return "Na FICR, a média para aprovação direta é 7,0 com no mínimo 75% de frequência. As provas da 1ª etapa (P1) ocorrem de 06 a 11 de abril e da 2ª etapa (P2) de 01 a 06 de junho de 2026.";
        }

        if (q.contains("segunda chamada") || q.contains("2ª chamada") || q.contains("faltei")) {
            return "O pedido de 2ª chamada deve ser feito no Portal do Aluno em até 72h úteis após a avaliação perdida, com documento comprobatório anexo.";
        }

        if (q.contains("endereço") || q.contains("endereco") || q.contains("onde fica") || q.contains("local")) {
            return "A FICR está localizada na Av. Caxangá, 3841 - Iputinga, Recife - PE (CEP: 50670-000).";
        }

        return "Olá! Sou a assistente acadêmica da FICR (modo de demonstração). Posso orientar você sobre o calendário acadêmico 2026, datas de provas, normas de aprovação, contatos da secretaria e canais de atendimento.";
    }
}
