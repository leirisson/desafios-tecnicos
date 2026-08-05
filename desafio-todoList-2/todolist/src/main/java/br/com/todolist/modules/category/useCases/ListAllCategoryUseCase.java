package br.com.todolist.modules.category.useCases;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.todolist.modules.category.CategoryEntity;
import br.com.todolist.modules.category.CategoryRepository;

@Service
public class ListAllCategoryUseCase {
    @Autowired
    private CategoryRepository repository;

    public List<CategoryEntity> execute() {
        return this.repository.findAll();
    }
}
