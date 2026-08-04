package br.com.contatos.modules.contact;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactRepository extends JpaRepository<ContactEntity, UUID> {
    List<ContactEntity> findByActiveTrue();
    List<ContactEntity> findByNameContainingIgnoreCase(String name);

}