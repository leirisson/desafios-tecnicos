package br.com.todolist.modules.tasks.useCases;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.LocalDate;
import java.util.Optional;
import java.util.UUID;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import br.com.todolist.erroshandles.ResourceNotFoundException;
import br.com.todolist.modules.tasks.Priority;
import br.com.todolist.modules.tasks.TaksRepository;
import br.com.todolist.modules.tasks.TaskEntity;
import br.com.todolist.modules.tasks.dto.CreateTaskDTO;

@ExtendWith(MockitoExtension.class)
class UpdateTaskUseCaseTest {

    @Mock
    private TaksRepository repository;

    @InjectMocks
    private UpdateTaskUseCase useCase;

    private UUID taskId;
    private TaskEntity existingTask;

    @BeforeEach
    void setUp() {
        taskId = UUID.randomUUID();

        existingTask = new TaskEntity();
        existingTask.setId(taskId);
        existingTask.setTitle("Título antigo");
        existingTask.setDescription("Descrição antiga");
        existingTask.setPriority(Priority.LOW);
        existingTask.setDueDate(LocalDate.now());
    }

    @Test
    void should_updateTask_when_taskExists() {
        CreateTaskDTO dto = new CreateTaskDTO(
                "Título novo",
                "Descrição nova",
                Priority.HIGH,
                LocalDate.now().plusDays(5),
                null);

        when(repository.findById(taskId)).thenReturn(Optional.of(existingTask));
        when(repository.save(any(TaskEntity.class))).thenAnswer(invocation -> invocation.getArgument(0));

        TaskEntity result = useCase.execute(taskId, dto);

        assertEquals("Título novo", result.getTitle());
        assertEquals("Descrição nova", result.getDescription());
        assertEquals(Priority.HIGH, result.getPriority());
        verify(repository).save(existingTask);
    }

    @Test
    void should_throwResourceNotFoundException_when_taskDoesNotExist() {
        CreateTaskDTO dto = new CreateTaskDTO("Título novo", "Descrição nova", Priority.HIGH, LocalDate.now(), null);

        when(repository.findById(taskId)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> useCase.execute(taskId, dto));

        verify(repository, never()).save(any());
    }
}