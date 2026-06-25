import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function TodoList() {
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchTodos();
    }, []);

    // Fetch all todos
    const fetchTodos = async () => {
        try {
            const response = await api.get("/todos");
            setTodos(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    // Add Todo
    const addTodo = async () => {
        if (!title || !description) {
            alert("Please fill all fields");
            return;
        }

        try {
            await api.post("/todos", {
                title,
                description,
            });

            setTitle("");
            setDescription("");

            fetchTodos();
        } catch (error) {
            console.log(error);
        }
    };

    // Delete Todo
    const deleteTodo = async (id) => {
        try {
            await api.delete(`/todos/${id}`);
            fetchTodos();
        } catch (error) {
            console.log(error);
        }
    };

    // Edit Todo
    const editTodo = (todo) => {
        setEditingId(todo.id);
        setTitle(todo.title);
        setDescription(todo.description);
    };

    // Update Todo
    const updateTodo = async () => {
        if (!title || !description) {
            alert("Please fill all fields");
            return;
        }

        try {
            const oldTodo = todos.find((todo) => todo.id === editingId);

            await api.put(`/todos/${editingId}`, {
                title,
                description,
                completed: oldTodo.completed,
            });

            setTitle("");
            setDescription("");
            setEditingId(null);

            fetchTodos();
        } catch (error) {
            console.log(error);
        }
    };

    // Toggle Complete / Pending
    const toggleStatus = async (todo) => {
        try {
            await api.put(`/todos/${todo.id}`, {
                title: todo.title,
                description: todo.description,
                completed: !todo.completed,
            });

            fetchTodos();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container">

            <h1>📝 Todo App</h1>

            <div className="form">

                <input
                    type="text"
                    placeholder="Enter Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Enter Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                {editingId ? (
                    <button
                        className="add-btn"
                        onClick={updateTodo}
                    >
                        Update Todo
                    </button>
                ) : (
                    <button
                        className="add-btn"
                        onClick={addTodo}
                    >
                        Add Todo
                    </button>
                )}

            </div>

            {todos.map((todo) => (

                <div className="todo-card" key={todo.id}>

                    <h3>
                        <Link
                            to={`/todo?id=${todo.id}`}
                            style={{
                                textDecoration: "none",
                                color: "#333",
                            }}
                        >
                            {todo.title}
                        </Link>
                    </h3>

                    <p>{todo.description}</p>

                    <p className="status">
                        {todo.completed
                            ? "✅ Completed"
                            : "❌ Pending"}
                    </p>

                    <div className="buttons">

                        <button
                            className="add-btn"
                            onClick={() => toggleStatus(todo)}
                        >
                            {todo.completed
                                ? "Mark Pending"
                                : "Complete"}
                        </button>

                        <button
                            className="edit-btn"
                            onClick={() => editTodo(todo)}
                        >
                            Edit
                        </button>

                        <button
                            className="delete-btn"
                            onClick={() => deleteTodo(todo.id)}
                        >
                            Delete
                        </button>

                    </div>

                </div>

            ))}

        </div>
    );
}

export default TodoList;