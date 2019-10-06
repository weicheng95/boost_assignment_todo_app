import { TodoItem } from "./todoItem";

export class TodoList {
  _id: String;
  name: String;
  items: Array<TodoItem>;

  constructor(_id: String, name: String, items?: Array<TodoItem>) {
    this._id = _id;
    this.name = name;
    this.items = items;
  }
}