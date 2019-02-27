import {Component, OnInit} from '@angular/core';
import {TodoListService} from './todo-list.service';
import {Todo} from './todo';
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-todo-list-component',
  templateUrl: 'todo-list.component.html'
  //, styleUrls: ['./todo-list.component.css']
})

export class TodoListComponent implements OnInit {
  public todos: Todo[];
  public filteredTodos: Todo[];

  public todoOwner: string;
  public todoStatus: boolean;
  public todoBody: string;
  public todoCategory: string;

  constructor(private todoListService: TodoListService) {

  }

  public filterTodos(
    searchOwner: string,
    searchStatus: boolean,
    searchBody: string,
    searchCategory: string): Todo[] {

    this.filteredTodos = this.todos;

    if (searchOwner != null){
      searchOwner = searchOwner.toLocaleLowerCase();

    this.filteredTodos = this.filteredTodos.filter(todo => {
      return !searchOwner || todo.owner.toLocaleLowerCase().indexOf(searchOwner) !== -1;
      });
    }
    if (searchStatus != null){
      this.filteredTodos = this.filteredTodos.filter(todo =>{
        return (todo.status === Boolean(searchStatus));
      });
    }

    if (searchBody != null){
      searchBody = searchBody.toLocaleLowerCase();

    this.filteredTodos = this.filteredTodos.filter(todo => {
      return !searchBody || todo.body.toLocaleLowerCase().indexOf(searchBody) !== -1;
      });
    }

   if (searchCategory != null){
      searchCategory = searchCategory.toLocaleLowerCase();

    this.filteredTodos = this.filteredTodos.filter(todo => {
      return !searchCategory || todo.category.toLocaleLowerCase().indexOf(searchCategory) !== -1;
      });
   }

   return this.filteredTodos;
}



  refreshTodos(): Observable<Todo[]> {
    const returnedTodos = this.todoListService.getTodos();
    returnedTodos
      .subscribe(allTodos => {
        this.todos = allTodos;

      });
    return returnedTodos;
  }

  ngOnInit(): void{
    this.refreshTodos();
  }

  parseString(str: string): boolean{
    if(str == "true"){
      return true;
    }else if(str == "false"){
      return false;
    }else{
      return null;
    }
  }
}

