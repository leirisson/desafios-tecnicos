package br.com.todolist.modules.tasks.useCases;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.todolist.erroshandles.ResourceNotFoundException;
import br.com.todolist.modules.tasks.TaksRepository;
import br.com.todolist.modules.tasks.TaskEntity;
import br.com.todolist.modules.tasks.dto.CreateTaskDTO;

@Service
public class UpdateTaskUseCase {

    @Autowired
    private TaksRepository repository;

    public TaskEntity execute(UUID id, CreateTaskDTO dto) {
        TaskEntity task = this.repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Erro ao buscar Task"));

        task.setTitle(dto.title());
        task.setDescription(dto.description());
        task.setPriority(dto.priority());
        task.setDueDate(dto.duDate());
        task.setCategoryId(dto.categoryId());

        return this.repository.save(task);
    }
}
