const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const errorHandler = require("errorhandler");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const todoController = require("./controllers/todo.js");

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.config({ path: `.env` });

/**
 * Connect to MongoDB.
 */
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on("error", err => {
  console.error(err);
  console.log(
    "%s MongoDB connection error. Please make sure MongoDB is running.",
    chalk.red("✗")
  );
  process.exit();
});


/**
 * Express server.
 */
const app = express();

/**
 * Express configuration.
 */
app.set("port", process.env.PORT || 8080);
app.set("views", path.join(__dirname, "views"));
app.use(cors());
app.use(bodyParser.json());

/**
 * API  routes.
 */
app.route("/api/todo/all").get(todoController.GetAllTodos);
app.route("/api/todo").post(todoController.CreateTodoList);
app.route("/api/todo/:id").delete(todoController.RemoveTodoList);
app.route("/api/todo/item/:id").get(todoController.GetTodoItems);
app.route("/api/todo/item").post(todoController.AddTodoItem);
app.route("/api/todo/item").put(todoController.UpdateTodoItem);
app.route("/api/todo/item/remove").post(todoController.RemoveTodoItem);

/**
 * Static Page Hosting
 */
app.use(
  "/",
  express.static(path.join(__dirname, "views/dist/Client"))
);


/**
 * Error Handler.
 */
if (process.env.NODE_ENV === "development") {
  // only use in development
  app.use(errorHandler());
} else {
  app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send("Server Error");
  });
}
/**
 * Start Express server.
 */
app.listen(app.get("port"), () => {
  console.log(
    "App is running at http://localhost:%d in %s mode",
    app.get("port"),
    app.get("env")
  );
  console.log("  Press CTRL-C to stop\n");
});