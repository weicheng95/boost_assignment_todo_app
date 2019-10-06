import { Component, OnInit } from '@angular/core';
import { TodoItem } from "../models/todoItem";
import { TodoList } from '../models/todoList';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {

  constructor(private service: ApiService) {
    this.newItem = new TodoItem("", "", false);
  }

  ngOnInit() {
    // listen to list click event
    this.service.currentList.subscribe(list => {
      this.currentList = list
      if (list._id) {
        // call api to get items
        this.service.getTodoItems(this.currentList._id).then((response) => {
          if (response) {
            this.todoArray = response.data.items;
          }
        })
      }
    });
  }

  todoArray = [];
  todo: string;
  newItem: TodoItem;
  currentList: TodoList;

  /**
   * Add a new todo item to list
   * @param String itemName
   */
  async addTodoItem() {
    if (this.todo) {
      this.newItem.title = this.todo;
      //add to server
      const { result, data } = await this.service.addTodoItem(this.newItem, this.currentList._id);
      if (result) {
        this.todoArray = data.items;
        // reset new Item
        this.newItem = new TodoItem("", "", false);
        // clean up todo
        this.todo = "";
      }
    }
  }

  /**
   * checkbox Trigger
   * @param todo 
   */
  checkValue(todo: TodoItem) {
    this.service.updateTodoItem(todo, this.currentList._id);
  }

  /**
   * Delete Todo Item from list
   * @param todo 
   */
  async deleteTodoItem(todo: TodoItem) {
    const { result } = await this.service.removeTodoItem(todo._id, this.currentList._id);
    if (result) {
      this.todoArray = this.todoArray.filter(x => x._id != todo._id);
    }
  }
}
