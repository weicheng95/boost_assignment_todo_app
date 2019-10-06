import { Component, OnInit } from '@angular/core';
import { TodoList } from "../models/todoList";
import { ApiService } from "../services/api.service";

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss']
})
export class TodolistComponent implements OnInit {

  constructor(private service: ApiService) {
    this.todolists = new Array<TodoList>();
  }

  ngOnInit() {
    this.service.getTodoLists().then(lists => this.todolists = lists);
  }

  // list click trigger
  listItemTrigger(item) {
    this.service.changeList(item);
  }

  todolists: Array<TodoList>;
  listName: String;

  /**
   * Remove Todo List
   * @param list
   */
  async removeTodoList(list: TodoList) {
    const { result } = await this.service.removeTodoList(list._id);
    if (result) {
      this.todolists = this.todolists.filter(x => x._id != list._id);
    }
  };

  /**
   * Add a new Todolit
   * @param String listName
   */
  async addTodoList() {
    if (this.listName) {
      const newList = new TodoList("", this.listName);
      const { result, data } = await this.service.addTodoList(newList);
      if (result) {
        //push new list to todolist
        this.todolists.push(data);
        // clean up input
        this.listName = "";
      }
    }
  }

}
