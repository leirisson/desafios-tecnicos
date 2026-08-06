package br.com.todolist.erroshandles;

public class CategoryHasLinkedTasksException extends RuntimeException {
    public CategoryHasLinkedTasksException(String message) {
        super(message);
    }
}
