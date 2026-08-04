package br.com.contatos.modules.contact;

import io.swagger.v3.oas.annotations.media.Schema;

public record ContactRequest(
    @Schema(description = "Nome completo do contato", example = "Maria Silva")
    String name,
    @Schema(description = "Telefone com DDD", example = "11999998888")
    String phone,
    @Schema(description = "E-mail do contato", example = "maria.silva@example.com")
    String email,
    @Schema(description = "Categoria do contato")
    ContactType category,
    @Schema(description = "Indica se o contato está ativo (não desabilitado)")
    Boolean active
) {}
