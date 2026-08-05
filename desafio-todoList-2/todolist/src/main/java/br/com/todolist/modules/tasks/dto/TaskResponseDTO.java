package br.com.todolist.modules.tasks.dto;

import java.time.LocalDate;
import java.util.UUID;

import br.com.todolist.modules.tasks.Priority;
import br.com.todolist.modules.tasks.Status;
import br.com.todolist.modules.tasks.TaskEntity;


public record TaskResponseDTO(
    UUID id,
    String title,
    String description,
    Priority priority,
    LocalDate dueDate,
    Status status,
    UUID categoryId,
    boolean overdue // RF05/RNF01: calculado aqui, não persistido
) {
    public static TaskResponseDTO from(TaskEntity task) {
        boolean isOverdue = task.getDueDate() != null
            && task.getDueDate().isBefore(LocalDate.now())
            && task.getStatus() != Status.COMPLETED;

        return new TaskResponseDTO(
            task.getId(),
            task.getTitle(),
            task.getDescription(),
            task.getPriority(),
            task.getDueDate(),
            task.getStatus(),
            task.getCategoryId(),
            isOverdue
        );
    }
}

