import { Injectable } from "@angular/core";
import { TodoItem } from "../../models/todoItem";
import { HttpClient } from "@angular/common/http";
import { AbstractItemsService } from "./abstract-items.service";
import { ApiResponse } from "../../models/apiResponse";

@Injectable({
  providedIn: "root"
})

export class HttpTodoItemsService extends AbstractItemsService {
  getTodoItems(_id: String): Promise<ApiResponse> {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.url}/item/${_id}`).subscribe(response => {
        if (response) {
          resolve({ result: true, data: response });
        } else {
          reject({ result: false });
        }
      });
    });
  }
  addTodoItem(item: TodoItem, _id: String): Promise<ApiResponse> {
    return new Promise((resolve, reject) => {
      this.http.post(this.url + "/" + "item", { _id, title: item.title }).subscribe(response => {
        if (response) {
          resolve({ result: true, data: response });
        } else {
          reject({ result: false });
        }
      });
    });
  }
  updateTodoItem(item: TodoItem, _id: String): Promise<ApiResponse> {
    return new Promise((resolve, reject) => {
      this.http.put(this.url + "/" + "item", { _id, completed: item.completed, title: item.title }).subscribe(response => {
        if (response) {
          resolve({ result: true });
        } else {
          reject({ result: false });
        }
      });
    });
  }
  removeTodoItem(itemId: String, listId: String): Promise<ApiResponse> {
    return new Promise((resolve, reject) => {
      this.http.post(`${this.url}/item/remove`, { itemId, listId }).subscribe(response => {
        if (response) {
          resolve({ result: true });
        } else {
          reject({ result: false });
        }
      });
    });
  }


  url: string; // e.g. "http://localhost:3000/items";

  constructor(protected http: HttpClient) {
    super();
    this.url = "http://localhost:8080/api/todo";
  }


}