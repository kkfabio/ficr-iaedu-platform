package br.edu.ficr.iaedu.assistant.knowledge;

import org.springframework.stereotype.Component;

@Component
public class FicrKnowledgeBase {

    public String getInstitutionalContext() {
        return """
                === BASE OFICIAL DE CONHECIMENTO INSTITUCIONAL - FICR (FACULDADE IMACULADA CONCEIÇÃO DO RECIFE) ===

                1. INFORMAÇÕES DA INSTITUIÇÃO:
                - Nome: Faculdade Imaculada Conceição do Recife (FICR).
                - Campus: Av. Caxangá, 3841 - Iputinga, Recife - PE, CEP: 50670-000.
                - Horário de Atendimento Presencial: Segunda a sexta-feira das 08h às 21h30; Sábados das 08h às 12h.
                - Salas e Instalações: Salas de aula climatizadas, Laboratórios de Informática 1, 2 e 3 (Bloco B), Auditório Principal e Biblioteca Central.

                2. CONTATOS E CANAIS DE ATENDIMENTO:
                - Secretaria Geral / Central de Atendimento ao Aluno (CRA):
                  * E-mail: secretaria@ficr.edu.br
                  * WhatsApp / Telefone: (81) 98765-4321 ou (81) 3210-9800
                  * Atendimento para: declarações, histórico acadêmico, certidões, trancamento e emissão de diplomas.
                - Coordenação dos Cursos de Tecnologia e IA:
                  * E-mail: coordenacao.ti@ficr.edu.br
                  * Local: Sala 201 - Bloco A
                  * Responsável por: dúvidas curriculares, aproveitamento de estudos, TCC e orientação de estágio.
                - Suporte ao AVA / Moodle:
                  * E-mail: suporte.ava@ficr.edu.br
                  * Atendimento para: dificuldades de login, acesso às salas virtuais e envio de arquivos.
                - Financeiro / NAF:
                  * E-mail: financeiro@ficr.edu.br
                  * Atendimento para: boletos, negociações, bolsas e convênios.
                - Biblioteca:
                  * E-mail: biblioteca@ficr.edu.br
                  * Serviços: empréstimo de livros físicos, acesso à biblioteca virtual Minha Biblioteca e apoio com normas ABNT.

                3. CALENDÁRIO ACADÊMICO (ANO LETIVO 2026):
                - Início das Aulas do Semestre: 10 de Fevereiro de 2026.
                - Avaliações da 1ª Etapa (P1): 06 a 11 de Abril de 2026.
                - Prazo limite para trancamento de matrícula: 30 de Abril de 2026.
                - Feira de Projetos e Inovação da FICR: 18 de Setembro de 2026.
                - Avaliações da 2ª Etapa (P2): 01 a 06 de Junho de 2026.
                - Solicitação de Segunda Chamada de Provas: Até 72 horas úteis após a data oficial da avaliação perdida.
                - Provas Finais: 15 a 20 de Junho de 2026.
                - Encerramento do Semestre Letivo: 30 de Junho de 2026.

                4. NORMAS E REGULAMENTO ACADÊMICO:
                - Frequência Mínima: 75% de presença em cada disciplina (exigência legal do MEC e regimental da FICR).
                - Critérios de Aprovação:
                  * Média Semestral >= 7,0: Aprovado por média direta.
                  * Média Semestral entre 4,0 e 6,9: Direito à Prova Final. Média final = (Média Semestral + Nota Final) / 2 >= 5,0.
                  * Média Semestral < 4,0: Reprovado direto, sem direito à final.
                - Segunda Chamada de Provas:
                  * O estudante que faltar a uma prova por motivo justificável (doença com atestado, falecimento de parente ou dever cívico) deve solicitar 2ª chamada via Portal do Aluno em até 72h úteis com a documentação comprobatória.
                - Atividades Complementares (Horas ACC):
                  * Devem ser submetidas pelo Portal do Aluno até o penúltimo semestre do curso, acompanhadas dos certificados em PDF.

                5. PORTAIS E SISTEMAS DIGITAIS:
                - Portal do Aluno: Ambiente para consultar notas, controle de frequência, emissão de boletos, solicitação de serviços e requerimentos.
                - Ambiente Virtual de Aprendizagem (AVA): Plataforma online para acompanhar o material das disciplinas, videoaulas e submeter atividades avaliativas.
                """;
    }
}
