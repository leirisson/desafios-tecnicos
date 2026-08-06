package br.com.todolist.modules.tasks.useCases;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.todolist.modules.tasks.Priority;
import br.com.todolist.modules.tasks.Status;
import br.com.todolist.modules.tasks.TaksRepository;
import br.com.todolist.modules.tasks.TaskEntity;

@Service
public class ListAllTasksUseCase {

    @Autowired
    private TaksRepository repository;

    public List<TaskEntity> execute(UUID categoryId, Priority priority, Status status) {
        return this.repository.findWithFilters(categoryId, priority, status);
    }
}
