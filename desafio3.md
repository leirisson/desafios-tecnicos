# Desafio 3 — Catálogo de Produtos com Busca e Paginação

> Nível: Iniciante
> Stack: Backend Java + Spring Boot | Frontend Next.js

**Contexto**
Um catálogo de produtos (pense em uma pequena loja) com busca textual, filtros e paginação — primeiro contato com performance de listagem em volume maior de dados.

**Regras de negócio**
- Produto tem: nome, descrição, preço (sempre > 0), categoria, quantidade em estoque e status (Ativo/Inativo).
- Produtos com estoque zerado devem aparecer como "Indisponível" na listagem, mas continuam visíveis (não somem).
- Preço deve ser exibido sempre formatado em Real (R$).

**Requisitos funcionais**
- RF01: Listagem paginada de produtos (backend controla paginação, não o frontend).
- RF02: Busca por nome/descrição com debounce no frontend.
- RF03: Filtro por categoria e por faixa de preço.
- RF04: Ordenação por preço (crescente/decrescente) e por nome.
- RF05: Página de detalhe do produto.

**Requisitos não funcionais**
- RNF01: Paginação via `Pageable` do Spring Data, nunca carregar lista inteira no frontend.
- RNF02: Índice de banco de dados na coluna usada para busca textual.
- RNF03: Debounce de busca no frontend com no mínimo 300ms.
- RNF04: Uso de `next/image` para otimização de imagens dos produtos.
- RNF05: Testes de integração cobrindo os cenários de filtro combinado.

**Entidades**

`Categoria`

| Atributo | Tipo | Observações |
| --- | --- | --- |
| id | Long | PK |
| nome | String | - |

`Produto`

| Atributo | Tipo | Observações |
| --- | --- | --- |
| id | Long | PK |
| nome | String | usado na busca textual |
| descricao | String | usado na busca textual |
| preco | BigDecimal | > 0, exibido em R$ |
| quantidadeEstoque | Integer | 0 → "Indisponível" (derivado) |
| status | Enum (Ativo, Inativo) | - |
| categoriaId | Long | FK → Categoria |

**Relacionamentos**
- Categoria 1:N Produto.

---

[← Desafio 2](desafio2.md) | [Índice](README.md) | [Próximo: Desafio 4 →](desafio4.md)
