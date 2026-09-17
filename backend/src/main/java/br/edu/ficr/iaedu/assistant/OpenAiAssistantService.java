package br.edu.ficr.iaedu.assistant;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;

@Service
@Profile("openai")
public class OpenAiAssistantService implements AssistantService {

    private final ChatClient chatClient;

    public OpenAiAssistantService(ChatClient.Builder chatClientBuilder) {
        this.chatClient = chatClientBuilder
                .defaultSystem("Você é a assistente acadêmica da FICR. Responda em português, seja clara e não invente informações institucionais.")
                .build();
    }

    @Override
    public String answer(String question) {
        return chatClient.prompt()
                .user(question)
                .call()
                .content();
    }
}
