import { Injectable } from "@angular/core";
import { TodoList } from "../../models/todoList";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { AbstractTodoListsService } from "./abstract-lists.service";
import { ApiResponse } from 'src/app/models/apiResponse';

@Injectable({
  providedIn: "root"
})

export class HttpTodoListsService extends AbstractTodoListsService {
  // get all tolist including items
  getTodoLists(): Promise<TodoList[]> {
    return new Promise((resolve) => {
      this.http.get<TodoList[]>(`${this.url}/all`).subscribe(response => {
        var lists = response.map((data) => new TodoList(data._id, data.name, data.items));
        resolve(lists);
      });
    });
  }

  // remove todolist based on id
  removeTodoList(_id: String): Promise<ApiResponse> {
    return new Promise((resolve, reject) => {
      this.http.delete(`${this.url}/${_id}`).subscribe(response => {
        if (response) {
          resolve({ result: true });
        } else {
          reject({ result: false });
        }
      });
    });
  }

  // add new list 
  addTodoList(list: TodoList): Promise<ApiResponse> {
    return new Promise((resolve, reject) => {
      this.http.post(this.url, list).subscribe(response => {
        if (response) {
          resolve({ result: true, data: response });
        } else {
          reject({ result: false });
        }
      });
    });
  }

  url: string;

  constructor(protected http: HttpClient) {
    super();
    this.url = "http://localhost:8080/api/todo";
  }


}