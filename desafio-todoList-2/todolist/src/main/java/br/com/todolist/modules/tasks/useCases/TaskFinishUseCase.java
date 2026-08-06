package br.com.todolist.modules.tasks.useCases;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.todolist.erroshandles.ResourceNotFoundException;
import br.com.todolist.modules.tasks.Status;
import br.com.todolist.modules.tasks.TaksRepository;
import br.com.todolist.modules.tasks.TaskEntity;

@Service
public class TaskFinishUseCase {
    @Autowired
    private TaksRepository repository;

    public TaskEntity execute(UUID id) {
        TaskEntity task = this.repository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Erro ao tentar atualizar uma task"));

        task.setStatus(Status.COMPLETED);
        return this.repository.save(task);
    }

}
