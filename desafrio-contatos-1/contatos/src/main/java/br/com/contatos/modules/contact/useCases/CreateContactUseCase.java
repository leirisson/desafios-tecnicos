package br.com.contatos.modules.contact.useCases;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.contatos.modules.contact.ContactEntity;
import br.com.contatos.modules.contact.ContactRepository;


@Service
public class CreateContactUseCase {
    
    @Autowired
    private ContactRepository repository;

    public void execute(ContactEntity contact){
        try {
            this.repository.save(contact);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }
}
