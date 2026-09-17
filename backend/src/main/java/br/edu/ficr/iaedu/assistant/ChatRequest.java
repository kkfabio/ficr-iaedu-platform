package br.edu.ficr.iaedu.assistant;

import jakarta.validation.constraints.NotBlank;
import java.util.List;

public record ChatRequest(
        @NotBlank(message = "A pergunta não pode ser vazia")
        String question,
        List<ChatMessage> history
) {
    public ChatRequest(String question) {
        this(question, List.of());
    }

    public List<ChatMessage> historyOrDefault() {
        return history != null ? history : List.of();
    }
}
