import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {HttpClient} from '@angular/common/http';

import {Todo} from './todo';
import {TodoListService} from './todo-list.service';

describe("Todo list service: ", () => {
  let todoListService: TodoListService;
// These are used to mock the HTTP requests so that we (a) don't have to
// have the server running and (b) we can check exactly which HTTP
// requests were made to ensure that we're making the correct requests.
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  const testTodos: Todo[] = [
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
  ];

  beforeEach(() => {
    // Set up the mock handling of the HTTP requests
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    // Construct an instance of the service with the mock
    // HTTP client.
    todoListService = new TodoListService(httpClient);
  });

  it('calls api/todos', () => {
    //Runs async, gets checked after the mock HTTP request "returns" a response
    //when req.flush(testTodos) is called below.
    todoListService.getTodos().subscribe(
      todos => expect(todos).toBe(testTodos)
    );
    const req = httpTestingController.expectOne(todoListService.todoUrl);
    //Exactly one request will be made
    expect(req.request.method).toEqual('GET');
    req.flush(testTodos);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });
});
