package br.edu.ficr.iaedu.assistant;

import jakarta.validation.constraints.NotBlank;

public record ChatRequest(
        @NotBlank(message = "A pergunta não pode ser vazia")
        String question
) {
}
