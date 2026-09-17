package br.edu.ficr.iaedu.assistant;

import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;

@Service
@Profile("mock")
public class MockAssistantService implements AssistantService {

    @Override
    public String answer(String question) {
        String normalizedQuestion = question.toLowerCase();

        if (normalizedQuestion.contains("agenda") || normalizedQuestion.contains("atividade")) {
            return "Você pode consultar suas próximas aulas, atividades e entregas na página Agenda do portal.";
        }

        if (normalizedQuestion.contains("comunicado") || normalizedQuestion.contains("aviso")) {
            return "Os comunicados oficiais estão reunidos na página Comunicados, com as informações mais recentes da instituição.";
        }

        if (normalizedQuestion.contains("secretaria") || normalizedQuestion.contains("contato")) {
            return "Para falar com a secretaria, use o canal de atendimento disponível na Central de ajuda.";
        }

        return "Ainda estou no modo de demonstração. Posso ajudar com agenda, atividades, comunicados e contato com a secretaria.";
    }
}
