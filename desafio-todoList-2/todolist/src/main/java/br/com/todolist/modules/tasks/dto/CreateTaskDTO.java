package br.com.todolist.modules.tasks.dto;

import java.time.LocalDate;
import java.util.UUID;

import br.com.todolist.modules.tasks.Priority;

public record CreateTaskDTO(
    String title,
    String description,
    Priority priority,
    LocalDate duDate,
    UUID categoryId
) {}
