package br.com.todolist.modules.tasks.useCases;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.todolist.modules.tasks.TaksRepository;
import br.com.todolist.modules.tasks.TaskEntity;

@Service
public class GetTaskByIdUseCase {

    @Autowired
    private TaksRepository repository;

    public TaskEntity execute(UUID id) {
        TaskEntity result = this.repository
                .findById(id)
                .orElseThrow(
                        () -> new RuntimeException("Erro ao tentar encontrar a task"));

        return result;
    }
}
