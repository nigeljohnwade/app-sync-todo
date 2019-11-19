import React, { memo } from 'react';

export function Todo({
    todo,
    onChange,
    handleEditClick,
    handleDeleteClick,
}) {
    return (
        <li>
            <p>{todo.name}</p>
            {onChange &&
                <input
                    type="checkbox"
                    checked={todo.status === 'done'}
                    onChange={onChange}
                />
            }
            {handleEditClick && <button onClick={handleEditClick}>Edit</button>}
            {handleDeleteClick && <button onClick={e => handleDeleteClick(todo.id, e)}>Delete</button>}
        </li>
    )
}

Todo.whyDidYouRender = true;

export default memo(Todo);