import React, { memo } from 'react';

export function Todo({
    todo,
    longForm = false,
    onChange,
    handleEditClick,
    handleDeleteClick,
}) {
    console.log(todo.status);
    return (
        <li className="row">
            <div className="flex-filler">
                <p >{todo.name} ({todo.status})</p>
                {longForm && <p>{todo.description}</p>}
            </div>
            {onChange &&
                <form>
                    <input
                        name={`status`}
                        type="radio"
                        value="draft"
                        defaultChecked={todo.status === 'draft'}
                        onChange={e => onChange(todo, e)}
                    />
                    <input
                        name={`status`}
                        type="radio"
                        value="pending"
                        defaultChecked={todo.status === 'pending'}
                        onChange={e => onChange(todo, e)}
                    />
                    <input
                        name={`status`}
                        type="radio"
                        value="doing"
                        defaultChecked={todo.status === 'doing'}
                        onChange={e => onChange(todo, e)}
                    />
                    <input
                        name={`status`}
                        type="radio"
                        value="done"
                        defaultChecked={todo.status === 'done'}
                        onChange={e => onChange(todo, e)}
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