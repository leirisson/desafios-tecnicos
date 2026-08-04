package br.com.contatos.modules.contact;

import java.util.UUID;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity(name = "contact")
@Data
public class ContactEntity {

    @Schema(description = "Identificador do contato, gerado pelo sistema", accessMode = Schema.AccessMode.READ_ONLY)
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Schema(description = "Nome completo do contato", example = "Maria Silva")
    private String name;

    @Schema(description = "Telefone com DDD", example = "11999998888")
    private String phone;

    @Schema(description = "E-mail do contato", example = "maria.silva@example.com")
    private String email;

    @Schema(description = "Indica se o contato está marcado como favorito")
    private Boolean favorite;

    @Schema(description = "Categoria do contato")
    private ContactType category;

    @Schema(description = "Indica se o contato está ativo (não desabilitado)")
    private Boolean active;
}
