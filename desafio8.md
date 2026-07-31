# Desafio 8 — Plataforma de Cobrança Recorrente

> Nível: Avançado
> Stack: Backend Java + Spring Boot | Frontend Next.js

**Contexto**
Um sistema de cobrança recorrente para prestadores de serviço (assinaturas mensais), incluindo geração automática de cobranças, tentativa de reprocessamento em caso de falha e notificação ao cliente.

**Regras de negócio**
- Cada assinatura gera uma cobrança automaticamente todo mês, na mesma data do contrato.
- Se o pagamento (simulado via gateway fake) falhar, o sistema tenta novamente em 1, 3 e 7 dias.
- Após 3 falhas consecutivas, a assinatura é suspensa automaticamente.
- Cobranças já pagas nunca podem ser geradas em duplicidade para o mesmo ciclo.

**Requisitos funcionais**
- RF01: Cadastro de assinaturas/planos.
- RF02: Job agendado que gera cobranças do dia.
- RF03: Integração com gateway de pagamento simulado (endpoint fake com respostas de sucesso/falha configuráveis).
- RF04: Reprocessamento automático de cobranças falhadas, respeitando o cronograma de tentativas.
- RF05: Dashboard de assinaturas com status (Ativa, Suspensa, Cancelada) e histórico de cobranças.

**Requisitos não funcionais**
- RNF01: Jobs assíncronos com fila (ex: Spring + RabbitMQ, ou `@Scheduled` + fila de retry) — evitar processamento síncrono bloqueante.
- RNF02: Idempotência garantida na geração de cobrança (chave única por assinatura + ciclo, evitando duplicidade mesmo em reexecução do job).
- RNF03: Circuit breaker/retry configurável na chamada ao gateway de pagamento (ex: Resilience4j).
- RNF04: Frontend com Server Actions do Next.js para operações administrativas (suspender/reativar assinatura).
- RNF05: Testes cobrindo cenários de falha e retry (incluindo o caso de suspensão automática após 3 falhas).

---

[← Desafio 7](desafio7.md) | [Índice](README.md) | [Próximo: Desafio 9 →](desafio9.md)
