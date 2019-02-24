import {TodoListService} from "./todo-list.service";
import {TodoListComponent} from "./todo-list.component";
import {Todo} from "./todo";
import {Observable} from "rxjs/Observable";
import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {CustomModule} from "../custom.module";
import {MATERIAL_COMPATIBILITY_MODE} from "@angular/material";

describe('Todo List', () => {
  let todoList: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>; //???

  let todoListServiceStub: {
    getTodos: () => Observable<Todo[]>
  };

  beforeEach(() => {
    todoListServiceStub = {
      getTodos: () => Observable.of([
        {
          _id: 'id_1',
          owner: 'Bob',
          status: true,
          body: 'Bob has done his stuff',
          category: 'software design'
        },
        {
          _id: 'id_2',
          owner: 'Greg',
          status: false,
          body: 'Greg has stuff to do',
          category: 'homework'
        },
        {
          _id: 'id_3',
          owner: 'Sam',
          status: false,
          body: 'Good luck sam, you\'re going to need it',
          category: 'homework'
        },
        {
          _id: 'id_4',
          owner: 'Sue',
          status: true,
          body: 'Sue is very busy',
          category: 'software design'
        }
      ])
    };
    TestBed.configureTestingModule({
      imports: [CustomModule], //???
      declarations: [TodoListComponent],
      providers: [{provide: TodoListService, useValue: todoListServiceStub},
        {provide: MATERIAL_COMPATIBILITY_MODE, useValue: true}] //??
    });
  });
  beforeEach(async (() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(TodoListComponent); //Why is this
      todoList = fixture.componentInstance;
      fixture.detectChanges(); //And this what finally fixed it?
    });
  }));

  it('Contains the right number of todos', () => {
    expect(todoList.todos.length).toBe(4);
  });
  it('Contains Bob', () => {
    expect(todoList.todos.some((todo: Todo) => todo.owner === 'Bob')).toBe(true);
  });
  it('Contains Sue', () => {
    expect(todoList.todos.some((todo: Todo) => todo.owner === 'Sue')).toBe(true);
  });
  it('Does not contain KK', () => {
    expect(todoList.todos.some((todo: Todo) => todo.owner === 'KK')).toBe(false);
  });
  it('Contains two complete todos', () => {
    expect(todoList.todos.filter((todo: Todo) => todo.status === true).length).toBe(2);
  });
  it('Contains two "Software Design" todos', () => {
    expect(todoList.todos.filter((todo: Todo) => todo.category === 'software design').length).toBe(2);
  });
  it('Filter todos by owner "Bob" has correct length', () =>{
    todoList.filteredTodos = todoList.todos;
    expect(todoList.filterTodos("Bob", null, null, null).length).toBe(1);
  });
});
