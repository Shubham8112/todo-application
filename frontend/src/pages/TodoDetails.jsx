import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import api from "../services/api";

function TodoDetails() {
    const [todo, setTodo] = useState(null);

    const [searchParams] = useSearchParams();

    const id = searchParams.get("id");

    useEffect(() => {
        fetchTodo();
    }, []);

    const fetchTodo = async () => {
        try {
            const response = await api.get(`/todos/${id}`);
            setTodo(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    if (!todo) {
        return (
            <div className="container">
                <h2>Loading...</h2>
            </div>
        );
    }

    return (
        <div className="container">

            <div className="todo-card">

                <h1>📄 Todo Details</h1>

                <h2>{todo.title}</h2>

                <br />

                <p>
                    <strong>Description:</strong>
                </p>

                <p>{todo.description}</p>

                <br />

                <p className="status">
                    <strong>Status:</strong>{" "}
                    {todo.completed
                        ? "✅ Completed"
                        : "❌ Pending"}
                </p>

                <br />

                <Link
                    to="/"
                    style={{
                        textDecoration: "none",
                        color: "royalblue",
                        fontWeight: "bold"
                    }}
                >
                    ← Back to Todo List
                </Link>

            </div>

        </div>
    );
}

export default TodoDetails;