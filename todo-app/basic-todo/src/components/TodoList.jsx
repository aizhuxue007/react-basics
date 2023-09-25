import React, { useState, useRef } from "react";

const TodoList = ( {todos, setTodos} ) => {
  let [editingInputStr, setEditingInputStr] = useState("");
  let editingInputRef = useRef(null);

  function toggleTodo(id, completed) {
    setTodos((currentTodos) => {
      return currentTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed };
        }
        return todo;
      });
    });
  }

  const handleEditingInputStr = (event) => {
    setEditingInputStr(event.target.value);
  };
  function editTodo(id) {
    setTodos((currentTodos) => {
      return currentTodos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            editing: !todo.editing,
          };
        }
        return todo;
      });
    });
  }
  function updateTodo(id) {
    setTodos((currentTodos) => {
      return currentTodos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            title: `${editingInputStr.charAt(0).toUpperCase()}${editingInputStr.slice(1)}`,
            editing: !todo.editing,
          };
        }
        return todo;
      });
    });
  }
  function deleteTodo(id) {
    setTodos((currentTodos) => {
      return currentTodos.filter((todo) => todo.id !== id);
    });
  }
  return (
    <ul className="todos">
      {todos.map((todo) => {
        return (
          <li className="todo" key={todo.id}>
            <div className="todo__info">
              <input
                className="checkbox"
                type="checkbox"
                checked={todo.completed}
                onChange={(e) => toggleTodo(todo.id, e.target.checked)}
              ></input>
              {todo.editing ? (
                <input
                  ref={editingInputRef}
                  type="text"
                  placeholder={`editing...`}
                  onChange={handleEditingInputStr}
                  value={editingInputStr}
                />
              ) : todo.completed ? (
                <label className="todo__label-item todo__label-item--completed">
                  {todo.title}
                </label>
              ) : (
                <label className="todo__label-item" htmlFor="">
                  {todo.title}
                </label>
              )}
            </div>
            <div className="todo__buttons">
              {todo.editing ? (
                <>
                  <button
                    className="btn-edit"
                    onClick={() => updateTodo(todo.id)}
                  >
                    Submit Edit
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="btn-edit"
                    onClick={() => editTodo(todo.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default TodoList;
