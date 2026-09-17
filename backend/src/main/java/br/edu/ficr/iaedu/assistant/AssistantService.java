package br.edu.ficr.iaedu.assistant;

import java.util.List;

public interface AssistantService {

    String answer(String question);

    default String answer(String question, List<ChatMessage> history) {
        return answer(question);
    }
}
