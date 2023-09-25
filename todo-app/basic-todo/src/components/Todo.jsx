import { React, useState, useEffect } from "react";
import "../css/Todo.css";
import TodoTitle from "./TodoTitle";
import FormTodo from "./FormTodo";
import TodoList from "./TodoList";


const Todo = () => {
  let [todos, setTodos] = useState(() => {
    let localValue = localStorage.getItem('ITEM')
    if (localValue == null) return []
    return JSON.parse(localValue)
  });

  useEffect(() => {
    localStorage.setItem('ITEM', JSON.stringify(todos))
  }, [todos])

  const addTodo = (itemName) => {
    if (!itemName == "") {
      setTodos((prevTodos) => [
        ...prevTodos,
        {
          id: crypto.randomUUID(),
          title: `${itemName.charAt(0).toUpperCase()}${itemName.slice(1)}`,
          completed: false,
          editing: false,
        },
      ]);
    }
  };

  return (
    <>
      <div className="todo-wrapper">  
        <TodoTitle />
        <FormTodo onSubmit={addTodo}/>
        <div className="todo__container">
          <TodoList todos={todos} setTodos={setTodos}/>
        </div>
      </div>
    </>
  );
};
export default Todo;
