# Desafio 10 — Marketplace com Matching e Processamento Assíncrono

> Nível: Avançado
> Stack: Backend Java + Spring Boot | Frontend Next.js

**Contexto**
Uma plataforma tipo marketplace que conecta demandas (pedidos de serviço) com prestadores, fazendo "matching" automático baseado em critérios (localização, categoria, disponibilidade), com todo o pipeline de notificação e resposta processado de forma assíncrona e observável.

**Regras de negócio**
- Ao criar uma demanda, o sistema deve encontrar até 5 prestadores compatíveis (mesma categoria, dentro de um raio de distância) e notificá-los.
- Prestadores têm 10 minutos para aceitar; o primeiro a aceitar fecha o match, os demais são notificados de que a vaga foi preenchida.
- Se nenhum prestador aceitar em 10 minutos, o raio de busca aumenta automaticamente e uma nova rodada de notificação ocorre (máximo 3 rodadas).
- Todo o fluxo de matching deve ser rastreável (é possível auditar por que um prestador específico recebeu ou não uma notificação).

**Requisitos funcionais**
- RF01: Criação de demanda e cadastro de prestadores com categoria e localização.
- RF02: Algoritmo de matching (categoria + distância) executado de forma assíncrona.
- RF03: Notificação dos prestadores compatíveis (pode ser simulada via WebSocket/e-mail).
- RF04: Aceite do prestador com resolução de concorrência (apenas um vence).
- RF05: Escalonamento automático de raio após timeout, com no máximo 3 rodadas.
- RF06: Painel frontend mostrando o status do matching em tempo real (buscando → notificado → aceito/expirado).

**Requisitos não funcionais**
- RNF01: Processamento de matching via fila de mensagens (ex: RabbitMQ/Kafka) — o request de criação de demanda não pode bloquear esperando o matching completo.
- RNF02: Resolução de concorrência no aceite via lock otimista ou transação atômica (garantir que só um prestador feche o match mesmo com aceites simultâneos).
- RNF03: Observabilidade: cada rodada de matching gera logs estruturados e idealmente métricas (ex: tempo médio até match, taxa de expiração por rodada).
- RNF04: Timeout e escalonamento de rodada implementados via scheduler confiável (sobrevive a reinício do serviço).
- RNF05: Frontend com atualização em tempo real do status (WebSocket ou polling curto) e testes E2E cobrindo o fluxo completo de criação → match → aceite.

---

[← Desafio 9](desafio9.md) | [Índice](README.md)
