package br.edu.ficr.iaedu.assistant;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;

class MockAssistantServiceTest {

    private final MockAssistantService service = new MockAssistantService();

    @Test
    void answersQuestionsAboutTheAgenda() {
        String answer = service.answer("Onde vejo minha agenda?");

        assertThat(answer).contains("Agenda");
    }

    @Test
    void providesFallbackForUnknownQuestions() {
        String answer = service.answer("Qual é o clima hoje?");

        assertThat(answer).contains("modo de demonstração");
    }
}
