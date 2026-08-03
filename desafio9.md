# Desafio 9 — Sistema Multi-tenant de Gestão

> Nível: Avançado
> Stack: Backend Java + Spring Boot | Frontend Next.js

**Contexto**
Uma plataforma SaaS onde múltiplas empresas (tenants) usam o mesmo sistema, mas com isolamento total de dados entre elas — nenhuma empresa pode, sob hipótese alguma, acessar dado de outra.

**Regras de negócio**
- Cada usuário pertence a exatamente um tenant (empresa).
- Todo dado (clientes, pedidos, o que for) é sempre escopado por tenant.
- Um super-admin (fora do conceito de tenant) pode visualizar métricas agregadas entre tenants, mas nunca dados operacionais detalhados de um tenant específico sem autorização explícita.

**Requisitos funcionais**
- RF01: Cadastro de tenants e vínculo de usuários a um tenant.
- RF02: CRUD de um recurso de negócio (ex: clientes) totalmente escopado por tenant.
- RF03: Login que resolve automaticamente o tenant do usuário autenticado.
- RF04: Painel super-admin com métricas agregadas (sem detalhe operacional).
- RF05: Frontend com contexto de tenant refletido na URL ou no token (ex: subdomínio ou claim no JWT).

**Requisitos não funcionais**
- RNF01: Estratégia de multi-tenancy definida explicitamente (schema por tenant ou discriminator column) e aplicada de forma consistente em todas as queries — nenhuma query pode "esquecer" o filtro de tenant.
- RNF02: Filtro de tenant aplicado numa camada transversal (ex: Hibernate Filter ou interceptor), não replicado manualmente em cada repository.
- RNF03: Testes de segurança específicos tentando forçar acesso cross-tenant (devem falhar consistentemente).
- RNF04: Auditoria de acesso: toda operação sensível registra tenant, usuário e timestamp.
- RNF05: Tenant identificado no JWT como claim, validado em toda requisição antes de chegar à camada de negócio.

**Entidades**

`Tenant`

| Atributo | Tipo | Observações |
| --- | --- | --- |
| id | Long | PK |
| nome | String | - |
| identificador | String | slug/subdomínio, único |

`Usuario`

| Atributo | Tipo | Observações |
| --- | --- | --- |
| id | Long | PK |
| nome | String | - |
| email | String | - |
| tenantId | Long | FK → Tenant (nulo para super-admin) |
| role | Enum (SuperAdmin, ...) | super-admin existe fora do conceito de tenant |

`Cliente` (exemplo de recurso de negócio escopado)

| Atributo | Tipo | Observações |
| --- | --- | --- |
| id | Long | PK |
| nome | String | - |
| tenantId | Long | FK → Tenant, discriminador obrigatório |

`LogAuditoria`

| Atributo | Tipo | Observações |
| --- | --- | --- |
| id | Long | PK |
| tenantId | Long | FK → Tenant |
| usuarioId | Long | FK → Usuario |
| acao | String | - |
| timestamp | Timestamp | - |

**Relacionamentos**
- Tenant 1:N Usuario.
- Tenant 1:N (qualquer recurso de negócio, ex: Cliente) — todo dado operacional carrega `tenantId`.
- Filtro de tenant aplicado transversalmente (ex: Hibernate Filter/interceptor), nunca manual por repository.

---

[← Desafio 8](desafio8.md) | [Índice](README.md) | [Próximo: Desafio 10 →](desafio10.md)
