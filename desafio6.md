# Desafio 6 — E-commerce Simplificado com Carrinho e Estoque

> Nível: Intermediário
> Stack: Backend Java + Spring Boot | Frontend Next.js

**Contexto**
Uma loja online básica onde o cliente monta um carrinho, finaliza pedido e o sistema precisa garantir consistência de estoque — inclusive sob concorrência (dois clientes comprando o último item).

**Regras de negócio**
- Um pedido só é confirmado se houver estoque suficiente de todos os itens no momento da finalização.
- Ao finalizar o pedido, o estoque deve ser debitado de forma atômica.
- Um carrinho expira após 30 minutos de inatividade, liberando a "reserva" implícita de estoque.
- Pedido tem status: Pendente, Confirmado, Cancelado.

**Requisitos funcionais**
- RF01: Adicionar/remover itens do carrinho.
- RF02: Finalizar pedido, validando estoque.
- RF03: Cancelar pedido (devolvendo estoque).
- RF04: Histórico de pedidos do cliente.
- RF05: Área do frontend simulando checkout (carrinho → resumo → confirmação).

**Requisitos não funcionais**
- RNF01: Débito de estoque deve ser atômico e seguro contra concorrência (lock otimista com versionamento, `@Version` na entidade).
- RNF02: Uso de padrão de camadas (Controller → Service → Repository) com regras de negócio isoladas na service.
- RNF03: Estado do carrinho no frontend gerenciado com Context API ou similar (Zustand), persistido localmente durante a sessão.
- RNF04: Testes simulando concorrência de dois pedidos disputando o último item em estoque.
- RNF05: Logs estruturados registrando cada mudança de status de pedido (auditoria mínima).

**Entidades**

`Cliente`

| Atributo | Tipo | Observações |
| --- | --- | --- |
| id | Long | PK |
| nome | String | - |
| email | String | - |

`Produto`

| Atributo | Tipo | Observações |
| --- | --- | --- |
| id | Long | PK |
| nome | String | - |
| preco | BigDecimal | - |
| quantidadeEstoque | Integer | - |
| version | Integer | lock otimista para débito atômico |

`Carrinho`

| Atributo | Tipo | Observações |
| --- | --- | --- |
| id | Long | PK |
| clienteId | Long | FK → Cliente |
| criadoEm | Timestamp | - |
| expiraEm | Timestamp | 30 min de inatividade |

`ItemCarrinho`

| Atributo | Tipo | Observações |
| --- | --- | --- |
| id | Long | PK |
| carrinhoId | Long | FK → Carrinho |
| produtoId | Long | FK → Produto |
| quantidade | Integer | - |

`Pedido`

| Atributo | Tipo | Observações |
| --- | --- | --- |
| id | Long | PK |
| clienteId | Long | FK → Cliente |
| status | Enum (Pendente, Confirmado, Cancelado) | - |
| dataCriacao | Timestamp | - |

`ItemPedido`

| Atributo | Tipo | Observações |
| --- | --- | --- |
| id | Long | PK |
| pedidoId | Long | FK → Pedido |
| produtoId | Long | FK → Produto |
| quantidade | Integer | - |
| precoUnitario | BigDecimal | snapshot do preço no momento da compra |

**Relacionamentos**
- Cliente 1:N Carrinho e 1:N Pedido.
- Carrinho 1:N ItemCarrinho; ItemCarrinho N:1 Produto.
- Pedido 1:N ItemPedido; ItemPedido N:1 Produto.

---

[← Desafio 5](desafio5.md) | [Índice](README.md) | [Próximo: Desafio 7 →](desafio7.md)
