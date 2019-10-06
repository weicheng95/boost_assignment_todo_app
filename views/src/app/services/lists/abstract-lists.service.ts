import { Injectable } from "@angular/core";
import { TodoList } from "../../models/todoList";
import { ApiResponse } from 'src/app/models/apiResponse';

@Injectable({
  providedIn: 'root'
})
export abstract class AbstractTodoListsService {

  currentTodoList: TodoList;

  constructor() { }
  getCurrentTodoList(): TodoList {
    return this.currentTodoList;
  };
  setCurrentTodoList(TodoList: TodoList) {
    this.currentTodoList = TodoList;
  };
  abstract getTodoLists(): Promise<TodoList[]>;
  abstract removeTodoList(_id: String): Promise<ApiResponse>;
  abstract addTodoList(list: TodoList): Promise<ApiResponse>;
}