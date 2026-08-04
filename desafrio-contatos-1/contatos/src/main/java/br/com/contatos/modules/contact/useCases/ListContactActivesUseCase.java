package br.com.contatos.modules.contact.useCases;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.contatos.modules.contact.ContactEntity;
import br.com.contatos.modules.contact.ContactRepository;

@Service
public class ListContactActivesUseCase {
    @Autowired
    private ContactRepository repository;

    public List<ContactEntity> execute() {
        return this.repository.findByActiveTrue();
    }
}
