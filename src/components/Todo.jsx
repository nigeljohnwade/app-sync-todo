import React from 'react';

export function Todo({
    todo,
    onChange,
    handleEditClick,
    handleDeleteClick,
}){
    return (
        <li>
            <p>{todo.name}</p>
            <input
                type="checkbox"
                checked={todo.status === 'done'}
                onChange={onChange}
            />
            <button onClick={handleEditClick}>Edit</button>
            <button onClick={e => handleDeleteClick(todo.id, e)}>Delete</button>
        </li>
    )
}

export default Todo;