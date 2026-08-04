package br.com.contatos.modules.contact.useCases;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.contatos.modules.contact.ContactEntity;
import br.com.contatos.modules.contact.ContactRepository;

@Service
public class DisableUseCase {
    @Autowired
    private ContactRepository repository;

    public void execute(UUID id) {
        ContactEntity result = this.repository
                .findById(id)
                .orElseThrow(() -> new RuntimeException("Erro contato não encontrado."));

        // deastivando o contato
        result.setActive(false);
        this.repository.save(result);
    }
}
