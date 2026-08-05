package br.com.todolist.modules.tasks.useCases;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.todolist.modules.tasks.Status;
import br.com.todolist.modules.tasks.TaksRepository;
import br.com.todolist.modules.tasks.TaskEntity;
import br.com.todolist.modules.tasks.dto.CreateTaskDTO;

@Service
public class CreateTaskUseCase {

    @Autowired
    private TaksRepository repository;

    public TaskEntity execute(CreateTaskDTO dto) {
        TaskEntity task = new TaskEntity();

        task.setTitle(dto.title());
        task.setDescription(dto.description());
        task.setPriority(dto.priority());
        task.setDueDate(dto.duDate());
        task.setCategoryId(dto.categoryId());
        task.setStatus(Status.PENDING); // regra de negócio: toda tarefa nasce pendente

        return this.repository.save(task);

    }
}
