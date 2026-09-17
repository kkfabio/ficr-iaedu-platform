package br.edu.ficr.iaedu.assistant;

import static org.assertj.core.api.Assertions.assertThat;

import br.edu.ficr.iaedu.assistant.knowledge.FicrKnowledgeBase;
import org.junit.jupiter.api.Test;

import java.util.List;

class MockAssistantServiceTest {

    private final FicrKnowledgeBase knowledgeBase = new FicrKnowledgeBase();
    private final MockAssistantService service = new MockAssistantService(knowledgeBase);

    @Test
    void answersQuestionsAboutTheAgenda() {
        String answer = service.answer("Onde vejo minha agenda?");

        assertThat(answer).contains("Agenda");
    }

    @Test
    void answersQuestionsAboutSecretariaWithContacts() {
        String answer = service.answer("Qual o whatsapp da secretaria?");

        assertThat(answer).contains("secretaria@ficr.edu.br");
        assertThat(answer).contains("98765-4321");
    }

    @Test
    void answersQuestionsAboutExamsAndGrades() {
        String answer = service.answer("Qual a média para aprovação e quando são as provas?");

        assertThat(answer).contains("7,0");
        assertThat(answer).contains("75%");
    }

    @Test
    void providesFallbackForUnknownQuestions() {
        String answer = service.answer("Qual é a velocidade da luz?", List.of());

        assertThat(answer).contains("modo de demonstração");
    }
}
