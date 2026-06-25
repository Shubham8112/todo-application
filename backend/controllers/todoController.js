const { readTodos, writeTodos } = require("../models/todoModel");

// GET ALL
const getAllTodos = (req, res) => {
    res.json(readTodos());
};

// GET BY ID
const getTodoById = (req, res) => {
    const todos = readTodos();

    const todo = todos.find(t => t.id === Number(req.params.id));

    if (!todo) {
        return res.status(404).json({
            message: "Todo not found"
        });
    }

    res.json(todo);
};

// CREATE TODO
const createTodo = (req, res) => {
    const todos = readTodos();

    const newTodo = {
        id: Date.now(),
        title: req.body.title,
        description: req.body.description,
        completed: false
    };

    todos.push(newTodo);

    writeTodos(todos);

    res.status(201).json(newTodo);
};

// UPDATE TODO
const updateTodo = (req, res) => {
    const todos = readTodos();

    const index = todos.findIndex(todo => todo.id === Number(req.params.id));

    if (index === -1) {
        return res.status(404).json({
            message: "Todo not found"
        });
    }

    todos[index] = {
        ...todos[index],
        ...req.body
    };

    writeTodos(todos);

    res.json(todos[index]);
};

// DELETE TODO
const deleteTodo = (req, res) => {
    const todos = readTodos();

    const index = todos.findIndex(todo => todo.id === Number(req.params.id));

    if (index === -1) {
        return res.status(404).json({
            message: "Todo not found"
        });
    }

    const deletedTodo = todos.splice(index, 1);

    writeTodos(todos);

    res.json({
        message: "Todo deleted successfully",
        deletedTodo
    });
};
module.exports = {
    getAllTodos,
    getTodoById,
    createTodo,
    updateTodo,
    deleteTodo
};