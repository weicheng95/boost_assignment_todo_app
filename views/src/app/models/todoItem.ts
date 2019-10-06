export class TodoItem {
  _id: String;
  title: String;
  completed: Boolean;

  constructor(_id: String, title: String, completed: Boolean) {
    this._id = _id;
    this.title = title;
    this.completed = completed;
  }
}