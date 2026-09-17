# FICR-IAEDU1A

## Reformulação do projeto

O FICR-IAEDU1A está sendo reformulado: o protótipo original, construído com
HTML e CSS por squads, dará lugar a uma aplicação educacional multiplataforma
com um agente de inteligência artificial para responder às dúvidas dos usuários.

A reformulação mantém o objetivo acadêmico do projeto, mas cria uma base mais
adequada para centralizar informações, orientar alunos e responsáveis e facilitar
o acesso a conteúdos, avisos, atividades e serviços da instituição.

## Visão da nova solução

A aplicação será composta por:

- um aplicativo mobile desenvolvido com **React Native**;
- uma API backend desenvolvida com **Java e Spring Boot**;
- um agente conversacional implementado com **Spring AI**;
- uma base de conhecimento formada por informações institucionais e conteúdos
	educacionais autorizados;
- recursos para encaminhar a conversa a um responsável quando a IA não puder
	responder com segurança.

O agente deverá responder dúvidas frequentes sobre temas como calendário,
atividades, comunicados, horários, serviços e orientações acadêmicas. Ele não
deve inventar informações: quando não encontrar uma resposta confiável, deverá
informar sua limitação e orientar o usuário para o canal apropriado.

## Arquitetura proposta

```text
React Native (Android / iOS)
							|
							v
		 API Spring Boot
							|
							v
				Spring AI
							|
							v
 Base de conhecimento institucional
```

O aplicativo será responsável pela experiência do usuário, autenticação e
exibição das conversas. O backend concentrará as regras de negócio, a segurança,
o acesso aos dados e a integração com o modelo de linguagem por meio do Spring AI.

## Objetivos da reformulação

1. Transformar os protótipos estáticos em uma aplicação mobile utilizável.
2. Centralizar informações acadêmicas e institucionais em um único lugar.
3. Oferecer respostas rápidas para dúvidas recorrentes.
4. Preservar segurança, privacidade e rastreabilidade das interações.
5. Criar uma arquitetura preparada para futuras integrações e novos serviços.

## Escopo inicial

- aplicativo mobile com tela inicial, navegação e área de dúvidas;
- cadastro e autenticação de usuários;
- chat com histórico básico de conversas;
- respostas baseadas na base de conhecimento da instituição;
- encaminhamento de perguntas sem resposta para atendimento humano;
- painel ou estrutura administrativa para atualização dos conteúdos.

## Estado atual e próximos passos

O repositório ainda contém os protótipos originais em `squads/`, organizados por
squad e páginas HTML. Eles serão usados como referência visual e de conteúdo
durante a migração, sem que a estrutura atual limite a arquitetura da nova aplicação.

A implementação será feita por etapas:

1. definir requisitos, usuários e fontes oficiais de informação;
2. especificar a arquitetura do backend e do aplicativo mobile;
3. criar a API Spring Boot e o primeiro fluxo de perguntas e respostas com
	 Spring AI;
4. desenvolver as telas principais em React Native;
5. integrar, testar e validar as respostas do agente;
6. evoluir segurança, observabilidade e gerenciamento de conteúdo.

## Origem acadêmica

O projeto foi originalmente criado para o experimento de IA assistiva da
disciplina de Informática na Educação, com uso do GitHub Copilot e organização
em squads. A documentação histórica e as instruções do experimento permanecem
em `docs/INSTRUCTIONS.md`.
