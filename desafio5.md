# Desafio 5 — Sistema de Reservas com Controle de Conflitos

> Nível: Intermediário
> Stack: Backend Java + Spring Boot | Frontend Next.js

**Contexto**
Um sistema de agendamento (pense em salas de reunião ou horários de atendimento) onde o maior desafio não é o CRUD, e sim garantir que não existam reservas conflitantes.

**Regras de negócio**
- Um recurso (sala/equipamento) só pode ter uma reserva ativa por intervalo de tempo — não pode haver sobreposição de horários.
- Reservas só podem ser feitas com no mínimo 30 minutos de antecedência.
- Cancelamento só é permitido até 1 hora antes do horário reservado.
- Um usuário não pode ter mais de 3 reservas ativas simultaneamente.

**Requisitos funcionais**
- RF01: Cadastro de recursos reserváveis.
- RF02: Criar reserva, validando conflito de horário no backend.
- RF03: Cancelar reserva (respeitando janela de cancelamento).
- RF04: Calendário visual no frontend mostrando disponibilidade do recurso.
- RF05: Notificação (pode ser simulada, ex: log ou e-mail simples) ao confirmar/cancelar reserva.

**Requisitos não funcionais**
- RNF01: Validação de conflito deve ser feita com controle de concorrência (ex: lock otimista/pessimista na tabela de reservas) para evitar race condition em requisições simultâneas.
- RNF02: Uso de transações (`@Transactional`) garantindo atomicidade na criação da reserva.
- RNF03: Frontend com componente de calendário (pode usar lib como `react-big-calendar` ou similar).
- RNF04: Testes específicos simulando duas requisições concorrentes para o mesmo horário.
- RNF05: Horários armazenados e manipulados sempre em UTC, convertidos para exibição no frontend.

**Entidades**

`Recurso`

| Atributo | Tipo | Observações |
| --- | --- | --- |
| id | Long | PK |
| nome | String | ex: sala, equipamento |
| tipo | String | - |

`Usuario`

| Atributo | Tipo | Observações |
| --- | --- | --- |
| id | Long | PK |
| nome | String | - |
| email | String | - |

`Reserva`

| Atributo | Tipo | Observações |
| --- | --- | --- |
| id | Long | PK |
| recursoId | Long | FK → Recurso |
| usuarioId | Long | FK → Usuario |
| dataHoraInicio | Timestamp (UTC) | - |
| dataHoraFim | Timestamp (UTC) | - |
| status | Enum (Ativa, Cancelada) | - |
| version | Integer | lock otimista, evita conflito de concorrência |

**Relacionamentos**
- Recurso 1:N Reserva (não pode haver sobreposição de horário para o mesmo recurso).
- Usuario 1:N Reserva (máx. 3 reservas ativas simultâneas por usuário).

---

[← Desafio 4](desafio4.md) | [Índice](README.md) | [Próximo: Desafio 6 →](desafio6.md)
