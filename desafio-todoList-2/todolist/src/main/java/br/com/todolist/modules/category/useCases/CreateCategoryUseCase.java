package br.com.todolist.modules.category.useCases;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.todolist.modules.category.CategoryEntity;
import br.com.todolist.modules.category.CategoryRepository;

@Service
public class CreateCategoryUseCase {
    @Autowired
    private CategoryRepository repository;

    public CategoryEntity execute(CategoryEntity category) {
        CategoryEntity result = this.repository.save(category);
        return result;
    }
}
