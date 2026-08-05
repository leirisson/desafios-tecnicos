package br.com.todolist.modules.tasks;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.todolist.modules.tasks.dto.CreateTaskDTO;
import br.com.todolist.modules.tasks.dto.TaskResponseDTO;
import br.com.todolist.modules.tasks.useCases.CreateTaskUseCase;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/tasks")
public class TaskController {

    private final CreateTaskUseCase createTaskUseCase;

    @PostMapping
    public ResponseEntity<TaskResponseDTO> create(@RequestBody CreateTaskDTO taskBody) {
        TaskEntity result = this.createTaskUseCase.execute(taskBody);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(TaskResponseDTO.from(result));
    }

}
