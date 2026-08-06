# Desafio 2 — Lista de Tarefas com Categorias e Prioridades

> Nível: Iniciante
> Stack: Backend Java + Spring Boot | Frontend Next.js

**Contexto**
Um "to-do list" que vai além do básico: tarefas pertencem a categorias, têm prioridade e prazo, e o sistema precisa sinalizar tarefas atrasadas.

**Regras de negócio**
- Uma tarefa tem: título, descrição (opcional), categoria (relação 1:N — uma categoria tem várias tarefas), prioridade (Baixa, Média, Alta) e data de vencimento.
- Uma tarefa é considerada "atrasada" se a data de vencimento passou e o status ainda não é "Concluída".
- Categorias não podem ser excluídas se tiverem tarefas vinculadas.

**Requisitos funcionais**
- ✅ RF01: CRUD de categorias.
- ✅ RF02: CRUD de tarefas, vinculadas a uma categoria.
- ✅ RF03: Marcar tarefa como concluída.
- ✅ RF04: Listar tarefas com filtros combináveis (categoria + prioridade + status).
- ⏳ RF05: Dashboard simples mostrando contagem de tarefas atrasadas, pendentes e concluídas.

**Requisitos não funcionais**
- ✅ RNF01: Regra de "atrasada" deve ser calculada no backend, nunca confiar em cálculo do frontend.
- ✅ RNF02: Uso de DTOs para não expor entidades JPA diretamente na API.
- ✅ RNF03: Tratamento de erros padronizado (ex: `@ControllerAdvice` com respostas de erro consistentes).
- ⏳ RNF04: Frontend deve usar Server Components do Next.js para a listagem inicial e Client Components apenas onde há interatividade.
- ⏳ RNF05: Cobertura de testes unitários no backend ≥ 60% nas camadas de service.

**Entidades**

`Categoria`

| Atributo | Tipo | Observações |
| --- | --- | --- |
| id | Long | PK |
| nome | String | - |

`Tarefa`

| Atributo | Tipo | Observações |
| --- | --- | --- |
| id | Long | PK |
| titulo | String | obrigatório |
| descricao | String | opcional |
| prioridade | Enum (Baixa, Média, Alta) | - |
| dataVencimento | Date | - |
| status | Enum (Pendente, Concluída) | - |
| categoriaId | Long | FK → Categoria |

*Atrasada* não é um campo persistido — é derivado no backend (`dataVencimento < hoje && status != Concluída`).

**Relacionamentos**
- Categoria 1:N Tarefa (uma categoria tem várias tarefas; não pode ser excluída se houver tarefas vinculadas).

---

[← Desafio 1](desafio1.md) | [Índice](README.md) | [Próximo: Desafio 3 →](desafio3.md)
