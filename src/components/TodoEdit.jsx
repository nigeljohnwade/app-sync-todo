import React from 'react';

export function TodoEdit({
    todo,
    currValues,
    onChange,
    handleSaveClick,
    handleCancelClick,
}){
    return (
        <li key={todo.id}>
            <input
                name="name"
                type="text"
                value={currValues.name || ''}
                onChange={e => onChange(todo, e)}
                placeholder="Name"
            />
            <input
                name="description"
                type="text"
                value={currValues.description || ''}
                onChange={e => onChange(todo, e)}
                placeholder="Description"
            />
            <input
                name="comment"
                type="text"
                value={currValues.comment || ''}
                onChange={e => onChange(todo, e)}
                placeholder="Comment"
            />
            <input
                name="status"
                type="checkbox"
                checked={currValues.status === 'done'}
                onChange={e => onChange(todo, e)}
            />
            <button onClick={e => handleSaveClick(todo.id)}>Save</button>
            <button onClick={e => handleCancelClick(todo.id, e)}>Cancel</button>
        </li>
    )
}

export default TodoEdit;