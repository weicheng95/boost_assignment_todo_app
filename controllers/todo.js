'use strict'

const Todo = require("../models/todo.js");

const GetAllTodos = async (req, res) => {
  try {
    const result = await Todo.find();
    if (result) {
      res.send(result);
    }
  } catch (err) {
    res.status(400).send(err);
  }
}

const CreateTodoList = async (req, res) => {
  try {
    const { name, items } = req.body;
    const model = new Todo({
      name: name,
      items: items,
    })
    const result = await model.save();
    res.send(model);
  } catch (err) {
    res.status(400).send(err);
  }
}

const RemoveTodoList = async (req, res) => {
  try {
    const { id } = req.params;
    const todolist = await Todo.findById(id);
    if (todolist) {
      const result = await todolist.remove();
      res.send(result);
    }
  } catch (err) {
    res.status(400).send(err);
  }
}

const GetTodoItems = async (req, res) => {
  try {
    const { id } = req.params;
    const existedTodoList = await Todo.findById(id);
    if (existedTodoList) {
      res.send(existedTodoList);
    } else {
      throw new Error("list not found.");
    }
  } catch (err) {
    res.status(400).send(err);
  }
}

const AddTodoItem = async (req, res) => {
  try {
    const { _id, title } = req.body;
    const existedTodoList = await Todo.findById(_id);
    if (existedTodoList) {
      // add to items array
      existedTodoList.items.push({ title });

      // save to db
      const result = await existedTodoList.save();
      res.send(result);
    } else {
      throw new Error("list not found.");
    }
  } catch (err) {
    res.status(400).send(err);
  }
}

const UpdateTodoItem = async (req, res) => {
  try {
    const { _id, title, completed } = req.body;
    const existedTodoList = await Todo.findById(_id);
    if (existedTodoList) {

      const itemToUpdate = existedTodoList.items.find(x => x.title === title);
      itemToUpdate.completed = completed;

      // save to db
      const result = await existedTodoList.save();
      res.send(result);
    } else {
      throw new Error("list not found.");
    }
  } catch (err) {
    res.status(400).send(err);
  }
}

const RemoveTodoItem = async (req, res) => {
  try {
    const { itemId, listId } = req.body;
    const existedTodoList = await Todo.findById(listId);
    if (existedTodoList) {
      existedTodoList.items = existedTodoList.items.filter(x => x._id != itemId);
      // save to db
      const result = await existedTodoList.save();
      res.send(result);
    } else {
      throw new Error("list not found.");
    }
  } catch (err) {
    res.status(400).send(err);
  }
}

module.exports = {
  GetAllTodos,
  CreateTodoList,
  RemoveTodoList,
  GetTodoItems,
  AddTodoItem,
  UpdateTodoItem,
  RemoveTodoItem,
}