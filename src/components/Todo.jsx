import React, {
    memo,
} from 'react';

export function Todo({
    todo,
    longForm = false,
    updateTodo,
    handleEditClick,
    handleDeleteClick,
}) {
    const status = todo.status;
    const setStatus = (status) => {
        updateTodo({
            ...todo,
            status: status,
        });
    }

    return (
        <li className="row">
            <div className="flex-filler">
                <p className="todo-name bigger">{todo.name} <span className="todo-status smaller">({todo.status})</span>
                </p>
                {longForm && <p className="todo-description">{todo.description}</p>}
            </div>
            {updateTodo &&
            <form>
                <div className="radio-group">
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
                </div>
            </form>
            }
            {handleEditClick &&
                <button
                    className={`button-edit smaller ${Math.random() - .666 > 0 ? 'jaunty-alt' : Math.random() - .333 > 0 ?  '' : 'jaunty'}`}
                    onClick={handleEditClick}
                >
                    Edit
                </button>
            }
            {handleDeleteClick &&
                <button
                    className={`button-edit smaller ${Math.random() - .666 > 0 ? 'jaunty-alt' : Math.random() - .333 > 0 ? '' : 'jaunty'}`}
                    onClick={e => handleDeleteClick(todo.id, e)}
                >
                    Delete
                </button>
            }
        </li>
    )
}

Todo.whyDidYouRender = true;

export default memo(Todo);