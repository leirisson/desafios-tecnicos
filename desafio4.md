# Desafio 4 — Sistema de Autenticação com Perfis de Acesso

> Nível: Intermediário
> Stack: Backend Java + Spring Boot | Frontend Next.js

**Contexto**
Uma aplicação interna de gestão onde diferentes tipos de usuário (Admin, Gerente, Colaborador) têm permissões diferentes sobre os mesmos recursos.

**Regras de negócio**
- Um usuário tem um único perfil: Admin, Gerente ou Colaborador.
- Admin pode gerenciar usuários e todos os recursos.
- Gerente pode visualizar e editar recursos da sua equipe, mas não gerenciar usuários.
- Colaborador só visualiza e edita os próprios registros.
- Senhas nunca podem ser armazenadas em texto plano.
- Após 5 tentativas de login inválidas seguidas, a conta é bloqueada por 15 minutos.

**Requisitos funcionais**
- RF01: Cadastro e login de usuários.
- RF02: Emissão de token JWT no login, com refresh token.
- RF03: Middleware/guard de autorização por perfil em cada endpoint.
- RF04: Tela de login e área autenticada no Next.js com rotas protegidas.
- RF05: Bloqueio temporário de conta após tentativas inválidas.

**Requisitos não funcionais**
- RNF01: Hash de senha com BCrypt (custo mínimo 10).
- RNF02: Autenticação via Spring Security + JWT (access token curto, refresh token longo).
- RNF03: Proteção de rotas no Next.js via middleware, validando o token antes de renderizar páginas protegidas.
- RNF04: Nenhum dado sensível (senha, token) deve aparecer em logs.
- RNF05: Rate limiting no endpoint de login (ex: máx. 10 requisições/minuto por IP).

---

[← Desafio 3](desafio3.md) | [Índice](README.md) | [Próximo: Desafio 5 →](desafio5.md)
