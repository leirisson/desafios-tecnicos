# Desafio 7 — Fila de Atendimento em Tempo Real

> Nível: Avançado
> Stack: Backend Java + Spring Boot | Frontend Next.js

**Contexto**
Um painel de senha/atendimento (pense em clínica ou órgão público) onde o status da fila precisa atualizar em tempo real para todos os clientes conectados, sem que precisem recarregar a página.

**Regras de negócio**
- Cada ficha de atendimento tem prioridade (Normal, Preferencial) — preferenciais furam parcialmente a fila (a cada 2 normais, 1 preferencial é chamado).
- Um atendente só pode chamar a próxima senha se não tiver nenhum atendimento em andamento.
- Senha chamada e não comparecida em 3 minutos volta pro fim da fila (uma única vez; na segunda ausência, é cancelada).

**Requisitos funcionais**
- RF01: Emissão de senha (Normal/Preferencial).
- RF02: Chamada da próxima senha pelo atendente, seguindo a regra de intercalação.
- RF03: Painel público em tempo real mostrando senha atual chamada.
- RF04: Registro de não comparecimento e retorno/cancelamento da senha.
- RF05: Painel administrativo com métricas do dia (tempo médio de espera, total atendido).

**Requisitos não funcionais**
- RNF01: Comunicação em tempo real via WebSocket (Spring WebSocket/STOMP) entre backend e frontend.
- RNF02: Reconexão automática no frontend em caso de queda da conexão WebSocket.
- RNF03: Lógica de intercalação de prioridade coberta por testes unitários dedicados (é a parte mais sensível do sistema).
- RNF04: Estado da fila deve sobreviver a reinício do backend (persistido em banco, não apenas em memória).
- RNF05: Painel público deve funcionar mesmo com múltiplas abas/dispositivos simultâneos exibindo o mesmo estado.

---

[← Desafio 6](desafio6.md) | [Índice](README.md) | [Próximo: Desafio 8 →](desafio8.md)
