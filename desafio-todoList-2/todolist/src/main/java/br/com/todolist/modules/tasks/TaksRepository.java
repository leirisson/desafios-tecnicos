package br.com.todolist.modules.tasks;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TaksRepository extends JpaRepository<TaskEntity, UUID> {}
