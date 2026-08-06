package br.com.todolist.modules.category.useCases;

import java.util.UUID;


import org.springframework.stereotype.Service;

import br.com.todolist.erroshandles.ResourceNotFoundException;
import br.com.todolist.modules.category.CategoryEntity;
import br.com.todolist.modules.category.CategoryRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UpdateCategoryUseCase {

    private final CategoryRepository repository;

    public CategoryEntity execute(UUID id, CategoryEntity entity) {
        CategoryEntity result = this.repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found"));

        result.setName(entity.getName());

        return this.repository.save(result);
    }
}
