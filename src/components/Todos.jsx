import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { buildSubscription } from 'aws-appsync';

import ListTodos from 'graphql/GraphQLAllTodos';
import SubscribeTodos from 'graphql/GraphQLSubscribeTodos';
import Todo from './Todo';
import TodoEdit from './TodoEdit';

export class Todos extends Component {
    state = {
        editing: {},
        edits: {}
    };

    static whyDidYouRender = true;

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

    handleCancelClick = (id) => {
        const { editing } = this.state;

        delete editing[id];

        this.setState({ editing });
    }

    handleSaveClick = (todoId) => {
        const { edits: { [todoId]: data }, editing } = this.state;

        this.props.updateTodo(data);

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

    onChange(todo, event) {
        const field = event.target.name;
        const { edits } = this.state;

        edits[todo.id] = edits[todo.id] || {};

        const value = event.target.value;

        edits[todo.id][field] = value;

        this.setState({ edits });
    }

    renderTodo = (todo) => {
        const { editing, edits } = this.state;

        const isEditing = editing[todo.id];
        const currValues = edits[todo.id];

        /**
         *
         * Refactored the copied code here
         * to put components into their own file
         *
         */
        return (
            isEditing ?
                <TodoEdit
                    key={todo.id}
                    todo={todo}
                    currValues={currValues}
                    onChange={this.onChange.bind(this)}
                    handleSaveClick={this.handleSaveClick.bind(this)}
                    handleCancelClick={this.handleCancelClick.bind(this)}
                />
                :
                <Todo
                    longForm
                    key={todo.id}
                    todo={todo}
                    updateTodo={this.props.updateTodo}
                    handleEditClick={this.handleEditClick.bind(this, todo)}
                    handleDeleteClick={this.handleDeleteClick.bind(this)}
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
            <section className="flex-filler">
                <header>
                    <h2 className="section-heading">All to-dos</h2>
                </header>
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
            </section>
        );
    }
}

Todos.propTypes = {
    updateTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    data: PropTypes.shape({
        listTodos: PropTypes.object,
        refetch: PropTypes.func.isRequired,
    }).isRequired,
};

export default Todos;