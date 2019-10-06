import { Injectable } from '@angular/core';
import { TodoList } from '../models/todoList';
import { HttpClient } from '@angular/common/http';
import { AbstractTodoListsService } from '../services/lists/abstract-lists.service';
import { AbstractItemsService } from '../services/items/abstract-items.service';
import { HttpTodoListsService } from '../services/lists/http-lists.service';
import { HttpTodoItemsService } from '../services/items/http-items.service';
import { TodoItem } from '../models/todoItem';
import { BehaviorSubject } from 'rxjs';
import { ApiResponse } from '../models/apiResponse';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  listsStrategy: AbstractTodoListsService;
  itemsStrategy: AbstractItemsService;

  private listSource = new BehaviorSubject(new TodoList("", ""));

  currentList = this.listSource.asObservable();

  constructor(http: HttpClient) {

    this.listsStrategy = new HttpTodoListsService(http); //MockItemsService
    this.itemsStrategy = new HttpTodoItemsService(http);
  }

  changeList(list: TodoList) {
    this.listSource.next(list);
  };

  getTodoLists(): Promise<TodoList[]> {
    return this.listsStrategy.getTodoLists();
  };

  removeTodoList(_id: String): Promise<ApiResponse> {
    return this.listsStrategy.removeTodoList(_id);
  };

  addTodoList(list: TodoList): Promise<ApiResponse> {
    return this.listsStrategy.addTodoList(list);
  };

  getTodoItems(_id: String): Promise<ApiResponse> {
    return this.itemsStrategy.getTodoItems(_id);
  }

  addTodoItem(item: TodoItem, _id: String): Promise<ApiResponse> {
    return this.itemsStrategy.addTodoItem(item, _id);
  }

  updateTodoItem(item: TodoItem, _id: String, ): Promise<ApiResponse> {
    return this.itemsStrategy.updateTodoItem(item, _id);
  }

  removeTodoItem(itemId: String, listId: String, ): Promise<ApiResponse> {
    return this.itemsStrategy.removeTodoItem(itemId, listId);
  }
}