import React from 'react';

import Todo from './Todo';

export const TodosByStatus = ({
    data:  { queryTodosByStatusIndex: { items } = { items: [] } },
    status
}) => (
    <section>
        <header>
            <h2 className="section-heading">{status}</h2>
        </header>
        <ul className="stack">
            {items &&
                items.map(item => (<Todo
                    key={item.id}
                    todo={item}
                />))
            }
        </ul>
    </section>
);

export default TodosByStatus;