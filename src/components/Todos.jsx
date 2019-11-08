import React, { Component } from 'react';
import { buildSubscription } from 'aws-appsync';

import ListTodos from 'graphql/GraphQLAllTodos';
import SubscribeTodos from 'graphql/GraphQLSubscribeTodos';
import Todo from './Todo';

export class Todos extends Component {
    state = {
        editing: {},
        edits: {}
    };

    /**
     *
     *  buildSubscription uses the SubscribeTodos document defining
     *  the subscription to create and ListTodos defining what query
     *  in the cache to automatically update. It also accepts two
     *  additional optional parameters:
     *
     *  idField: used if your GraphQL subscription response type uses
     *    something other than "id"
     *  operationType: override if you do not want to infer actions such
     *    as "add" or "update" from the subscription name
     *
     */
    componentDidMount() {
        console.log(this.props);
        this.props.data.subscribeToMore(
            buildSubscription(SubscribeTodos, ListTodos)
        );
    }

    /**
     *
     * Now replace <Todos /> component with the following code:
     * (It will add basic state management for update/delete operations)
     *
     */

    handleEditClick = (todo, e) => {
        const { editing, edits } = this.state;

        editing[todo.id] = true;
        edits[todo.id] = { ...todo };

        this.setState({ editing, edits });
    }

    handleCancelClick = (id, e) => {
        const { editing } = this.state;

        delete editing[id];

        this.setState({ editing });
    }

    handleSaveClick = (todoId) => {
        const { edits: { [todoId]: data }, editing } = this.state;
        const { id, name, description, status, comment, version } = data;

        this.props.updateTodo({
            id,
            name,
            description,
            status,
            comment,
            version,
        });

        delete editing[todoId];

        this.setState({ editing });
    }

    handleDeleteClick = (todoId, e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!global.confirm('Are you sure?')) {
            return;
        }

        this.props.deleteTodo({ id: todoId });
    }

    onChange(todo, field, event) {
        console.log(todo, field, event);
        const { edits } = this.state;

        edits[todo.id] = edits[todo.id] || {};

        let value;

        switch (field) {
            case 'status':
                value = event.target.checked ? 'done' : 'pending';
                break;
            default:
                value = event.target.value;
                break;
        }

        edits[todo.id][field] = value;

        this.setState({ edits });
    }

    renderTodo = (todo) => {
        console.log(todo);
        const { editing, edits } = this.state;

        const isEditing = editing[todo.id];
        const currValues = edits[todo.id];

        return (
            isEditing ?
                <li key={todo.id}>
                    <input type="text" value={currValues.name || ''} onChange={this.onChange.bind(this, todo, 'name')} placeholder="Name" />
                    <input type="text" value={currValues.description || ''} onChange={this.onChange.bind(this, todo, 'description')} placeholder="Description" />
                    <input type="text" value={currValues.comment || ''} onChange={this.onChange.bind(this, todo, 'comment')} placeholder="Comment" />
                    <input type="checkbox" checked={currValues.status === 'done'} onChange={this.onChange.bind(this, todo, 'status')} />
                    <button onClick={this.handleSaveClick.bind(this, todo.id)}>Save</button>
                    <button onClick={this.handleCancelClick.bind(this, todo.id)}>Cancel</button>
                </li>
                :
                <Todo
                    key={todo.id}
                    todo={todo}
                    onChange={this.onChange.bind(this, todo, 'status')}
                    handleEditClick={this.handleEditClick.bind(this, todo)}
                    handleDeleteClick={this.handleDeleteClick.bind(this, todo.id)}
                />);
    }

    /**
     *
     *  Ends magic copy pasted code
     *
     */

    render() {
        /* listTodos, refetch come from the graphql HOC?
         * Verfied by logging props, data contains these
         * items.
        */
        const { listTodos, refetch } = this.props.data;

        return (
            <div>
                <button onClick={() => refetch()}>Refresh</button>
                <ul className="stack">
                    {
                        listTodos &&
                        [...listTodos.items]
                            .sort((a, b) => a.name.localeCompare(b.name))
                            .map(item => {
                                return this.renderTodo(item)
                            })
                    }
                </ul>
            </div>
        );
    }
}

export default Todos;