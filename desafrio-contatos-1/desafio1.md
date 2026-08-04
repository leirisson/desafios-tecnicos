# Desafio 1 — Gerenciador de Contatos Pessoais

> Nível: Iniciante
> Stack: Backend Java + Spring Boot | Frontend Next.js

**Contexto**
Uma aplicação simples de agenda de contatos pessoais, onde o usuário cadastra, edita, visualiza e remove contatos. Serve como base pra fixar CRUD completo fullstack.

**Regras de negócio**
- Um contato tem: nome (obrigatório), telefone (obrigatório, formato brasileiro), e-mail (opcional, mas se preenchido deve ser válido), e categoria (Pessoal, Trabalho, Família).
- Não pode existir dois contatos com o mesmo telefone.
- Contatos não podem ser excluídos permanentemente — apenas marcados como inativos (soft delete).

**Requisitos funcionais**
✅ RF01: Cadastrar novo contato.
✅ RF02: Listar contatos ativos, com filtro por categoria.
✅ RF03: Editar dados de um contato existente.
✅ RF04: Inativar um contato (soft delete).
✅ RF05: Buscar contato por nome (busca parcial, case-insensitive).


**Requisitos não funcionais**
✅ RNF01: API REST documentada com OpenAPI/Swagger.
✅ RNF02: Validação de entrada no backend (Bean Validation) e no frontend (feedback imediato de erro).
✅ RNF03: Persistência em PostgreSQL via Spring Data JPA.
✅ RNF04: Frontend em Next.js com App Router, formulário controlado e listagem responsiva.
✅ RNF05: Tempo de resposta da listagem < 300ms para até 1.000 registros.

**Entidades**

`Contato`

| Atributo | Tipo | Observações |
| --- | --- | --- |
| id | Long | PK |
| nome | String | obrigatório |
| telefone | String | obrigatório, único, formato BR |
| email | String | opcional, validado se preenchido |
| categoria | Enum (Pessoal, Trabalho, Família) | - |
| ativo | boolean | soft delete |

Sem relacionamentos com outras entidades — modelo único.

---

[← Voltar ao índice](README.md) | [Próximo: Desafio 2 →](desafio2.md)
