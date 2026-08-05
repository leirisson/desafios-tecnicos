package br.com.todolist.modules.category;

import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.todolist.modules.category.useCases.CreateCategoryUseCase;
import br.com.todolist.modules.category.useCases.DeleteCategoryUseCase;
import br.com.todolist.modules.category.useCases.ListAllCategoryUseCase;
import br.com.todolist.modules.category.useCases.UpdateCategoryUseCase;
import lombok.RequiredArgsConstructor;


@RestController
@RequiredArgsConstructor
@RequestMapping("/category")
public class CategoryController {


    private final CreateCategoryUseCase createCategoryUseCase;
    private final ListAllCategoryUseCase listAllCategoryUseCase;
    private final DeleteCategoryUseCase deleteCategoryUseCase;
    private final UpdateCategoryUseCase updateCategoryUseCase;

    @GetMapping
    public ResponseEntity<List<CategoryEntity>> listAll() {
        return ResponseEntity.ok(this.listAllCategoryUseCase.execute());
    }

    @PostMapping
    public ResponseEntity<CategoryEntity> create(@RequestBody CategoryEntity categoryBody) {
        CategoryEntity result = this.createCategoryUseCase.execute(categoryBody);
        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CategoryEntity> update(@PathVariable UUID id, @RequestBody CategoryEntity categoryEntity) {
        CategoryEntity result = this.updateCategoryUseCase.execute(id, categoryEntity);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(result);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable UUID id) {
        this.deleteCategoryUseCase.execute(id);
    }

}
