import {Component, OnInit} from '@angular/core';
import {TodoListService} from './todo-list.service';
import {Todo} from './todo';
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-todo-list-component',
  templateUrl: 'todo-list.component.html'
})

export class TodoListComponent implements OnInit {
  public todos: Todo[];
  public name: string = "Hello Worlds";

  constructor(private todoListService: TodoListService) {

  }

  refreshTodos(): Observable<Todo[]> {
    const returnedTodos = this.todoListService.getTodos()
    returnedTodos
      .subscribe(allTodos => {
        this.todos = allTodos;

      });
    return returnedTodos;
  }

  ngOnInit(): void{
    this.refreshTodos();
  }
}


