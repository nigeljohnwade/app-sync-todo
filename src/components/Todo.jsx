import React, {
    memo,
    useState,
    useEffect,
} from 'react';

export function Todo({
    todo,
    longForm = false,
    updateTodo,
    handleEditClick,
    handleDeleteClick,
}) {
    const status = todo.status;
    const setStatus = (status) =>{
        updateTodo({
            ...todo,
            status: status,
        });
    }

    return (
        <li className="row">
            <div className="flex-filler">
                <p >{todo.name} ({todo.status})</p>
                {longForm && <p>{todo.description}</p>}
            </div>
            {updateTodo &&
                <form>
                    <input
                        name={`status`}
                        type="radio"
                        value="draft"
                        defaultChecked={status === 'draft'}
                        onChange={e => setStatus(e.target.value)}
                    />
                    <input
                        name={`status`}
                        type="radio"
                        value="pending"
                        defaultChecked={status === 'pending'}
                        onChange={e => setStatus(e.target.value)}
                    />
                    <input
                        name={`status`}
                        type="radio"
                        value="doing"
                        defaultChecked={status === 'doing'}
                        onChange={e => setStatus(e.target.value)}
                    />
                    <input
                        name={`status`}
                        type="radio"
                        value="done"
                        defaultChecked={status === 'done'}
                        onChange={e => setStatus(e.target.value)}
                    />
                </form>
            }
            {handleEditClick && <button onClick={handleEditClick}>Edit</button>}
            {handleDeleteClick && <button onClick={e => handleDeleteClick(todo.id, e)}>Delete</button>}
        </li>
    )
}

Todo.whyDidYouRender = true;

export default memo(Todo);