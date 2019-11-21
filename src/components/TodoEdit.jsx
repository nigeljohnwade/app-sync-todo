import React, { memo } from 'react';

export function TodoEdit({
    todo,
    currValues,
    onChange,
    handleSaveClick,
    handleCancelClick,
}) {
    return (
        <li key={todo.id}>
            <form
                className="stack"
                onSubmit={e => {
                    e.preventDefault();
                    handleSaveClick(todo.id);
                }}
                onReset={e => {
                    e.preventDefault();
                    handleCancelClick(todo.id)
                }}
            >
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={currValues.name || ''}
                        onChange={e => onChange(todo, e)}
                        placeholder="Name"
                    />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <input
                        id="description"
                        name="description"
                        type="text"
                        value={currValues.description || ''}
                        onChange={e => onChange(todo, e)}
                        placeholder="Description"
                    />
                </div>
                <div>
                    <label htmlFor="comment">Comment</label>
                    <input
                        id="comment"
                        name="comment"
                        type="text"
                        value={currValues.comment || ''}
                        onChange={e => onChange(todo, e)}
                        placeholder="Comment"
                    />
                </div>
                <div>
                    <label htmlFor="status">Status</label>
                    <input
                        id="status"
                        name="status"
                        type="checkbox"
                        checked={currValues.status === 'done'}
                        onChange={e => onChange(todo, e)}
                    />
                </div>
                <div>
                    <button type="submit">Save</button>
                    <button type="reset">Cancel</button>
                </div>
            </form>
        </li>
    )
}

TodoEdit.whyDidYouRender = true;

export default memo(TodoEdit);