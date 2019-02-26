import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Todo} from './todo';
import {environment} from "../../environments/environment";
import {Observable} from "rxjs/Observable";

@Injectable()
export class TodoListService {
  readonly todoUrl: string = environment.API_URL + 'todos';

  constructor(private httpClient: HttpClient) {

  }

  getTodos(): Observable<Todo[]> {
    return this.httpClient.get<Todo[]>(this.todoUrl);
  }

  getTodosById(_id: string): Observable<Todo> {
    return this.httpClient.get<Todo>(this.todoUrl + '/' + _id);
  }

}
