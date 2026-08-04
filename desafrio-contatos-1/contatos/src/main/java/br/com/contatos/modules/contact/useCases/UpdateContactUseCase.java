package br.com.contatos.modules.contact.useCases;

import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import br.com.contatos.modules.contact.ContactEntity;
import br.com.contatos.modules.contact.ContactRepository;

@Service
public class UpdateContactUseCase {

    @Autowired
    private ContactRepository repository;

    public ResponseEntity<ContactEntity> execute(UUID id, ContactEntity contact) {
        ContactEntity contactResult = this.repository.findById(id).orElseThrow(
                () -> new RuntimeException("Contato não encontrado"));

        // atualizando os dados do contato
        contactResult.setName(contact.getName());
        contactResult.setEmail(contact.getEmail());
        contactResult.setPhone(contact.getPhone());
        contactResult.setCategory(contact.getCategory());
        contactResult.setActive(contact.getActive());

        return ResponseEntity.ok(this.repository.save(contactResult));

    }
}
