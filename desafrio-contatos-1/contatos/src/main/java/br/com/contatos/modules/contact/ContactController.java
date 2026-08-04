package br.com.contatos.modules.contact;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.com.contatos.modules.contact.useCases.CreateContactUseCase;
import br.com.contatos.modules.contact.useCases.DisableUseCase;
import br.com.contatos.modules.contact.useCases.FindByNameUseCase;
import br.com.contatos.modules.contact.useCases.ListContactActivesUseCase;
import br.com.contatos.modules.contact.useCases.ToggleFavoriteUseCase;
import br.com.contatos.modules.contact.useCases.UpdateContactUseCase;

@RestController
@RequestMapping("/contacts")
public class ContactController {

    @Autowired
    private CreateContactUseCase createContactUseCase;
    @Autowired
    private ListContactActivesUseCase listContactActivesUseCase;
    @Autowired
    private UpdateContactUseCase updateContactUseCase;
    @Autowired
    private DisableUseCase disableUseCase;
    @Autowired
    private FindByNameUseCase findByNameUseCase;
    @Autowired
    private ToggleFavoriteUseCase toggleFavoriteUseCase;

    @PostMapping
    public ResponseEntity<Object> create(@RequestBody ContactEntity request) {
        this.createContactUseCase.execute(request);
        return ResponseEntity.status(201).body("Criado com sucesso.");
    }

    @GetMapping("/list")
    public List<ContactEntity> listContactActives() {
        return this.listContactActivesUseCase.execute();
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<ContactEntity> updateContact(
            @PathVariable UUID id,
            @RequestBody ContactEntity request) {
        return this.updateContactUseCase.execute(id, request);
    }

    @PutMapping("/disable/{id}")
    public ResponseEntity<Object> disabelContact(
            @PathVariable UUID id) {
        this.disableUseCase.execute(id);
        return ResponseEntity.status(201).body("Desabilitado com sucesso.");
    }

    @GetMapping("/search")
    public ResponseEntity<List<ContactEntity>> searchByname(@RequestParam String name) {
        return this.findByNameUseCase.execute(name);
    }

    @PutMapping("/favorite/{id}")
    public ResponseEntity<ContactEntity> toggleFavorite(@PathVariable UUID id) {
        return ResponseEntity.ok(this.toggleFavoriteUseCase.execute(id));
    }

}
