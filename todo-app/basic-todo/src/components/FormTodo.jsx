import { React, useState, useRef } from 'react';

const FormTodo = ({ onSubmit }) => {
    let [inputStr, setInputStr] = useState("");
    let inputRef = useRef(null);
    function handleSubmit(e) {
        e.preventDefault();
        onSubmit(inputStr);
        setInputStr("");
    }
    const handleInputChange = (event) => {
        setInputStr(event.target.value);
      };
    return (
        <>
        <form onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="text"
            placeholder={`Enter todo`}
            onChange={handleInputChange}
            value={inputStr}
          />
          <button>Add</button>
        </form>
        </>
    )
}

export default FormTodo;