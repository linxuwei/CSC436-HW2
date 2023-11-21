const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Todo = require("../models/Todo");
const privateKey = process.env.JWT_PRIVATE_KEY;

router.use(function (req, res, next) {
  if (req.header("Authorization")) {
    try {
      req.payload = jwt.verify(req.header("Authorization"), privateKey, {
        algorithms: ["RS256"],
      });
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  } else {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
});

router.post("/", async function (req, res) {
  const todo = new Todo({
    title: req.body.title,
    content: req.body.content,
    author: req.payload.id,
  });
  await todo
    .save()
    .then((savedTodo) => {
      return res.status(201).json({
        _id: savedTodo._id,
        title: savedTodo.title,
        content: savedTodo.content,
        author: savedTodo.author,
        createDate: savedTodo.createDate,
        isComplete: savedTodo.isComplete,
        completeDate: savedTodo.completeDate,
      });
    })
    .catch((error) => {
      return res.status(500).json({ error: error.message });
    });
});

router.get("/", async function (req, res) {
  Todo.find()
    .where("author")
    .equals(req.payload.id)
    .then((todos) => {
      return res.status(200).json(todos);
    })
    .catch((error) => {
      return res.status(500).json({ error: error.message });
    });
});

router.put("/:id", async function (req, res) {
  const  todoId  = req.params.id;
  const data = req.body;
  console.log("Todo ID:", todoId);
  try {
    const newTodo = await Todo.findOneAndUpdate(
      { _id: todoId},
      {
        $set: {
          isComplete: data.isComplete,
          completeDate: data.completeDate,
        },
      },
      { new: true }
    ).exec();
    if (!data) {
      return res
        .status(404)
        .json({ error: "Todo is not found" });
    }
    return res.status(200).json(newTodo);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", async function (req, res) {
  const todoId= req.params.id;
  // const { id } = req.body;
  // const { idt } = req.params;
  console.log("Request Params from Delete routes:", req.params);
  console.log("Request Params.id from delete routes:", todoId);
  // console.log("req.body from delete routes:", id);
  // console.log("req.params from delete routes:", idt);

  if (!todoId) {
    return res.status(400).json({ error: "Invalid todo ID" });
  }
  try{
    const todos = await Todo.findByIdAndDelete(todoId);
    return res.status(200).json({ todos: todos });
  }catch(error){
    return res.status(500).json({error:error.message});
  }
});

module.exports = router;
