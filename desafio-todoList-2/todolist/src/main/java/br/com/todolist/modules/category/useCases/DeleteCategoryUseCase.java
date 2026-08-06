package br.com.todolist.modules.category.useCases;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.todolist.erroshandles.CategoryHasLinkedTasksException;
import br.com.todolist.erroshandles.ResourceNotFoundException;
import br.com.todolist.modules.category.CategoryRepository;
import br.com.todolist.modules.tasks.TaksRepository;

@Service
public class DeleteCategoryUseCase {

    @Autowired
    private CategoryRepository repository;

    @Autowired
    private TaksRepository taksRepository;

    public void execute(UUID id) {
        this.repository.findById(id)
                .orElseThrow(
                        () -> new ResourceNotFoundException("Category not found"));

        if (this.taksRepository.existsByCategoryId(id)) {
            throw new CategoryHasLinkedTasksException(
                    "Categoria não pode ser excluída pois possui tarefas vinculadas");
        }

        this.repository.deleteById(id);
    }
}
