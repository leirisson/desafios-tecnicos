package br.com.contatos.modules.contact;

public record ContactRequest(
    String name,
    String phone,
    String email,
    ContactType category,
    Boolean active
) {}
