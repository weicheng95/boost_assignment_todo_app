import { Injectable } from "@angular/core";
import { TodoItem } from "../../models/todoItem";
import { ApiResponse } from "../../models/apiResponse";

@Injectable({
  providedIn: 'root'
})
export abstract class AbstractItemsService {

  currentTodoItem: TodoItem;

  constructor() { }

  abstract getTodoItems(_id: String): Promise<ApiResponse>;
  abstract addTodoItem(item: TodoItem, _id: String): Promise<ApiResponse>;
  abstract updateTodoItem(item: TodoItem, _id: String): Promise<ApiResponse>;
  abstract removeTodoItem(itemId: String, listId: String): Promise<ApiResponse>;

}