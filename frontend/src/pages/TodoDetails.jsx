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
        return <h2>Loading...</h2>;
    }

    return (
        <div style={{ padding: "20px" }}>

            <h1>Todo Details</h1>

            <h2>{todo.title}</h2>

            <p>
                <strong>Description:</strong> {todo.description}
            </p>

            <p>
                <strong>Status:</strong>{" "}
                {todo.completed ? "✅ Completed" : "❌ Pending"}
            </p>

            <br />

            <Link to="/">
                ← Back to Todo List
            </Link>

        </div>
    );
}

export default TodoDetails;