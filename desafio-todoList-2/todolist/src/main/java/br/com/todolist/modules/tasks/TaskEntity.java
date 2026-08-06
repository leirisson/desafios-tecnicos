package br.com.todolist.modules.tasks;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;


import br.com.todolist.modules.category.CategoryEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Entity(name="task")
@Data
public class TaskEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String title;
    
    private String description;

    private Priority priority;

    private LocalDate dueDate; // data de vencimento

    private Status status;

    private LocalDateTime completedAt;

    @ManyToOne()
    @JoinColumn(name="category_id", insertable = false, updatable = false)
    private CategoryEntity categoryEntity;

    @Column(name="category_id")
    private UUID categoryId;
}
