package br.com.todolist.modules.category.useCases;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import br.com.todolist.modules.category.CategoryRepository;

@Service
public class DeleteCategoryUseCase {

    @Autowired
    private CategoryRepository repository;

    public void execute(UUID id) {
        this.repository.findById(id)
                .orElseThrow(
                        () -> new RuntimeException("Category not found"));

        this.repository.deleteById(id);
    }
}
