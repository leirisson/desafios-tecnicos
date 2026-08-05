package br.com.todolist.modules.tasks.useCases;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.todolist.modules.tasks.TaksRepository;

@Service
public class DeleteTaskUseCase {
    
    @Autowired
    private TaksRepository repository;

    public void execute(UUID id){
        this.repository.deleteById(id);
    }
}
