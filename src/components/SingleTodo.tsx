import React, { useState } from "react";
import { Todo } from "../model";
import { AiFillEdit } from "react-icons/ai";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { MdOutlineDone } from "react-icons/md";
import "./styles.css";

interface Props {
    todo: Todo;
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTodo = ({ todo, todos, setTodos }: Props) => {
    const [edit, setEdit] = useState<boolean>(false);
    const [editTodo, setEditTodo] = useState<string>(todo.todo);

    const handleEdit = (e: React.FormEvent, id: number) => {
        e.preventDefault();

        setTodos(
            todos.map((t: Todo) => (t.id === id ? { ...t, todo: editTodo } : t))
        );

        setEdit(false);
    };

    const handleDelete = (id: number) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    const handleDone = (id: number) => {
        setTodos(
            todos.map((t) => (t.id === id ? { ...t, isDone: !t.isDone } : t))
        );
    };

    return (
        <form
            className="single__todos"
            onSubmit={(e) => handleEdit(e, todo.id)}
        >
            {edit ? (
                <input
                    className="todos__single--text"
                    value={editTodo}
                    onChange={(e) => setEditTodo(e.target.value)}
                />
            ) : todo.isDone ? (
                <s className="todos__single--text">{todo.todo}</s>
            ) : (
                <span className="todos__single--text">{todo.todo}</span>
            )}

            <div>
                <span
                    className="icon"
                    onClick={() => {
                        if (!edit && !todo.isDone) {
                            setEdit(!edit);
                        }
                    }}
                >
                    <AiFillEdit />
                </span>
                <span className="icon" onClick={() => handleDelete(todo.id)}>
                    <RiDeleteBin2Fill />
                </span>
                <span className="icon" onClick={() => handleDone(todo.id)}>
                    <MdOutlineDone />
                </span>
            </div>
        </form>
    );
};

export default SingleTodo;
