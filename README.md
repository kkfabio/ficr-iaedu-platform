# FICR-IAEDU1A

> Projeto acadêmico desenvolvido para a disciplina de **Inteligência Artificial** da **Faculdade Imaculada Conceição do Recife (FICR)**.

## 📚 Sobre o projeto

O **FICR-IAEDU1A** é um projeto acadêmico desenvolvido no contexto da disciplina de **Inteligência Artificial** da Faculdade Imaculada Conceição do Recife (FICR).

O projeto parte de um protótipo educacional desenvolvido originalmente em **HTML e CSS por squads** e está passando por uma reformulação arquitetural. A proposta é transformar o protótipo em uma aplicação educacional multiplataforma integrada a um **agente de Inteligência Artificial**, capaz de auxiliar usuários na consulta de informações acadêmicas e institucionais.

A nova versão busca centralizar informações, facilitar o acesso a conteúdos e serviços e oferecer um canal de atendimento baseado em IA, mantendo o projeto dentro de seu contexto **acadêmico e experimental**.

> **Importante:** este projeto possui finalidade acadêmica e não representa um sistema oficial da Faculdade Imaculada Conceição do Recife.

---

## 🤖 Proposta da solução

A nova aplicação será composta por diferentes camadas:

* **Aplicativo mobile** desenvolvido com React Native;
* **API Backend** desenvolvida com Java e Spring Boot;
* **Agente de Inteligência Artificial** utilizando Spring AI;
* **Base de conhecimento** contendo informações institucionais e conteúdos educacionais autorizados;
* **Mecanismo de encaminhamento** para atendimento humano quando a IA não possuir informações suficientes para responder.

O agente deverá auxiliar em dúvidas relacionadas a temas como:

* Calendário acadêmico;
* Atividades;
* Comunicados;
* Horários;
* Serviços;
* Orientações acadêmicas;
* Informações institucionais.

Um dos princípios do projeto é evitar respostas inventadas ou sem fundamentação. Quando não houver informações confiáveis na base de conhecimento, o agente deverá reconhecer sua limitação e orientar o usuário a procurar o canal de atendimento adequado.

---

## 🏗️ Arquitetura proposta

```text
                    ┌─────────────────────────┐
                    │    React Native App     │
                    │       Android / iOS     │
                    └────────────┬────────────┘
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │      Spring Boot API    │
                    │                         │
                    │ Regras de negócio       │
                    │ Autenticação            │
                    │ Segurança               │
                    │ Acesso aos dados        │
                    └────────────┬────────────┘
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │       Spring AI         │
                    │                         │
                    │ Agente conversacional   │
                    │ Integração com LLM       │
                    └────────────┬────────────┘
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │ Base de Conhecimento    │
                    │ Institucional/Educacional│
                    └─────────────────────────┘
```

O aplicativo será responsável pela interface e experiência do usuário, enquanto o backend concentrará as regras de negócio, autenticação, segurança, acesso aos dados e integração com o agente de IA.

---

## 🎯 Objetivos

1. Transformar os protótipos estáticos em uma aplicação mobile funcional.
2. Centralizar informações acadêmicas e institucionais.
3. Utilizar Inteligência Artificial para auxiliar na resolução de dúvidas recorrentes.
4. Garantir que as respostas do agente sejam baseadas em informações disponíveis e confiáveis.
5. Criar uma arquitetura organizada e preparada para futuras integrações.
6. Aplicar, na prática, conceitos estudados na disciplina de **Inteligência Artificial**.

---

## 📌 Escopo inicial

* [ ] Aplicativo mobile com React Native;
* [ ] Tela inicial e navegação;
* [ ] Cadastro e autenticação de usuários;
* [ ] Área de dúvidas;
* [ ] Chat com histórico básico de conversas;
* [ ] Integração com agente de IA;
* [ ] Respostas baseadas na base de conhecimento;
* [ ] Encaminhamento de perguntas para atendimento humano;
* [ ] Estrutura para gerenciamento e atualização dos conteúdos.

---

## 🔄 Estado atual

O repositório ainda contém os **protótipos originais**, localizados no diretório `squads/` e organizados de acordo com as equipes que participaram da primeira etapa do projeto.

Esses protótipos serão utilizados como **referência visual, estrutural e de conteúdo** durante a reformulação.

A nova implementação não ficará limitada à arquitetura original em HTML e CSS, permitindo a construção de uma solução baseada em uma arquitetura moderna de aplicação mobile, API e Inteligência Artificial.

---

## 🚀 Próximos passos

O desenvolvimento da nova versão será realizado de forma incremental:

1. Levantamento e definição dos requisitos;
2. Identificação dos usuários e suas necessidades;
3. Definição das fontes oficiais de informação;
4. Modelagem da arquitetura da aplicação;
5. Desenvolvimento da API com Spring Boot;
6. Implementação do agente utilizando Spring AI;
7. Desenvolvimento das interfaces em React Native;
8. Integração entre aplicativo, API e agente de IA;
9. Testes e validação das respostas;
10. Evolução dos mecanismos de segurança, observabilidade e gerenciamento de conteúdo.

---

## 🎓 Contexto acadêmico

Este projeto faz parte das atividades acadêmicas da **disciplina de Inteligência Artificial** da **Faculdade Imaculada Conceição do Recife (FICR)**.

A versão inicial do projeto foi desenvolvida como parte de um experimento relacionado ao uso de **IA assistiva**, utilizando ferramentas como o **GitHub Copilot** e uma dinâmica de desenvolvimento organizada em squads.

A documentação histórica do projeto e as instruções referentes ao experimento original estão disponíveis em:

```text
docs/INSTRUCTIONS.md
```

---

## 🛠️ Tecnologias previstas

| Tecnologia       | Utilização                                   |
| ---------------- | -------------------------------------------- |
| **React Native** | Aplicativo mobile                            |
| **Java**         | Desenvolvimento do backend                   |
| **Spring Boot**  | API e regras de negócio                      |
| **Spring AI**    | Integração e desenvolvimento do agente de IA |
| **Git / GitHub** | Versionamento e colaboração                  |

---

## 📖 Observação

Este repositório acompanha a evolução do projeto durante o desenvolvimento da disciplina. A arquitetura, tecnologias e funcionalidades apresentadas poderão sofrer alterações conforme os requisitos acadêmicos e os resultados obtidos durante a implementação.
