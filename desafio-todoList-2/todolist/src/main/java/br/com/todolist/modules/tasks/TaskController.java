package br.com.todolist.modules.tasks;

import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.com.todolist.modules.tasks.dto.CreateTaskDTO;
import br.com.todolist.modules.tasks.dto.TaskResponseDTO;
import br.com.todolist.modules.tasks.useCases.CreateTaskUseCase;
import br.com.todolist.modules.tasks.useCases.DeleteTaskUseCase;
import br.com.todolist.modules.tasks.useCases.GetTaskByIdUseCase;
import br.com.todolist.modules.tasks.useCases.ListAllTasksUseCase;
import br.com.todolist.modules.tasks.useCases.TaskFinishUseCase;
import br.com.todolist.modules.tasks.useCases.UpdateTaskUseCase;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/tasks")
public class TaskController {

    private final CreateTaskUseCase createTaskUseCase;
    private final ListAllTasksUseCase listAllTasksUseCase;
    private final GetTaskByIdUseCase getTaskByIdUseCase;
    private final UpdateTaskUseCase updateTaskUseCase;
    private final DeleteTaskUseCase deleteTaskUseCase;
    private final TaskFinishUseCase taskFinishUseCase;

    @GetMapping
    public ResponseEntity<List<TaskResponseDTO>> list(
            @RequestParam(required = false) UUID categoryId,
            @RequestParam(required = false) Priority priority,
            @RequestParam(required = false) Status status) {
        List<TaskResponseDTO> result = this.listAllTasksUseCase.execute(categoryId, priority, status)
                .stream()
                .map(TaskResponseDTO::from)
                .toList();
        return ResponseEntity.ok(result);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TaskResponseDTO> getById(@PathVariable UUID id) {
        TaskEntity result = this.getTaskByIdUseCase.execute(id);
        return ResponseEntity.ok(TaskResponseDTO.from(result));
    }

    @PostMapping
    public ResponseEntity<TaskResponseDTO> create(@RequestBody CreateTaskDTO taskBody) {
        TaskEntity result = this.createTaskUseCase.execute(taskBody);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(TaskResponseDTO.from(result));
    }

    @PutMapping("/{id}")
    public ResponseEntity<TaskResponseDTO> update(
            @PathVariable UUID id,
            @RequestBody CreateTaskDTO taskBody) {

        TaskEntity task = this.updateTaskUseCase.execute(id, taskBody);

        return ResponseEntity.ok(TaskResponseDTO.from(task));

    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable UUID id) {
        this.deleteTaskUseCase.execute(id);
    }

    @PatchMapping("/complete/{id}")
    public ResponseEntity<TaskResponseDTO> completeTask(@PathVariable UUID id) {
        TaskEntity task = this.taskFinishUseCase.execute(id);
        return ResponseEntity.ok(TaskResponseDTO.from(task));
    }
}
