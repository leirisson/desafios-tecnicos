package br.com.contatos.modules.contact.useCases;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import br.com.contatos.modules.contact.ContactEntity;
import br.com.contatos.modules.contact.ContactRepository;

@Service
public class FindByNameUseCase {

    @Autowired
    private ContactRepository repository;

    public ResponseEntity<List<ContactEntity>> execute(String name) {
        List<ContactEntity> result =  this.repository.findByNameContainingIgnoreCase(name);

        if(result.isEmpty()){
            new RuntimeException("Erro usuario não encontrado");
        }

        return ResponseEntity.ok(result);
    }
}
