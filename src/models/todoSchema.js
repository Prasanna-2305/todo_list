const mongoose = require("mongoose");

const todo = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  todo: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "pending",
  },
});
const todoList = mongoose.model("todoList", todo);
module.exports = todoList;
