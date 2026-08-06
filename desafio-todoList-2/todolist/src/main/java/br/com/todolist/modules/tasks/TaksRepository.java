package br.com.todolist.modules.tasks;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface TaksRepository extends JpaRepository<TaskEntity, UUID> {
    @Query("SELECT t FROM task t WHERE " +
            "(:categoryId IS NULL OR t.categoryId = :categoryId) AND " +
            "(:priority IS NULL OR t.priority = :priority) AND " +
            "(:status IS NULL OR t.status = :status)")
    List<TaskEntity> findWithFilters(
            @Param("categoryId") UUID categoryId,
            @Param("priority") Priority priority,
            @Param("status") Status status);
}
