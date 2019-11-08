import React from 'react';

export function Todo({
    todo,
    onChange,
    handleEditClick,
    handelDeleteClick,
}){
    return (
        <li>
            <p>{todo.name}</p>
            <input type="checkbox" checked={todo.status === 'done'} onChange={onChange} />
            <button onClick={handleEditClick}>Edit</button>
            <button onClick={handelDeleteClick}>Delete</button>
        </li>
    )
}

export default Todo;