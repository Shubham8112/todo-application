import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

function TodoList() {
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [editingId, setEditingId] = useState(null);

    // Fetch all todos
    useEffect(() => {
        fetchTodos();
    }, []);

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
            await api.put(`/todos/${editingId}`, {
                title,
                description,
                completed: false,
            });

            setTitle("");
            setDescription("");
            setEditingId(null);

            fetchTodos();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Todo List</h1>

            <input
                type="text"
                placeholder="Enter Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <br />
            <br />

            <input
                type="text"
                placeholder="Enter Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <br />
            <br />

            {editingId ? (
                <button onClick={updateTodo}>Update Todo</button>
            ) : (
                <button onClick={addTodo}>Add Todo</button>
            )}

            <hr />

            {todos.map((todo) => (
                <div key={todo.id}>
                    <h3>
                        <Link to={`/todo?id=${todo.id}`}>
                            {todo.title}
                        </Link>
                    </h3>

                    <p>{todo.description}</p>

                    <p>
                        {todo.completed ? "✅ Completed" : "❌ Pending"}
                    </p>

                    <button onClick={() => editTodo(todo)}>
                        Edit
                    </button>

                    <button
                        onClick={() => deleteTodo(todo.id)}
                        style={{ marginLeft: "10px" }}
                    >
                        Delete
                    </button>

                    <hr />
                </div>
            ))}
        </div>
    );
}

export default TodoList;