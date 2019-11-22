import React, { memo } from 'react';

export function Todo({
    todo,
    longForm = false,
    onChange,
    handleEditClick,
    handleDeleteClick,
}) {
    return (
        <li className="row">
            <div className="flex-filler">
                <p >{todo.name}</p>
                {longForm && <p>{todo.description}</p>}
            </div>
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