import React, { Component } from 'react';
import AWSAppSyncClient, { buildSubscription } from 'aws-appsync';
import {
    Rehydrated,
    graphqlMutation,
} from 'aws-appsync-react';
import {
    ApolloProvider,
    graphql,
    compose,
} from 'react-apollo';

import ListTodos from './GraphQLAllTodos';
import ListTodosByStatus from './GraphQLAllTodosByStatus';
import NewTodo from './GraphQLNewTodo';
import SubscribeTodos from './GraphQLSubscribeTodos';
import UpdateTodo from './GraphQLUpdateTodo';
import DeleteTodo from './GraphQLDeleteTodo';
import awsmobile from './aws-exports';

import './App.css';

class Todos extends Component {
    state = {
        editing: {},
        edits: {}
    };

    componentDidMount() {
        this.props.data.subscribeToMore(
            buildSubscription(SubscribeTodos, ListTodos)
        );
    }

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
        const { editing, edits } = this.state;

        const isEditing = editing[todo.id];
        const currValues = edits[todo.id];

        return (
            isEditing ?
                <li key={todo.id} className={`todo-list__item todo-list__item--${todo.status}`}>
                    <input type="text" value={currValues.name || ''} onChange={this.onChange.bind(this, todo, 'name')} placeholder="Name" />
                    <input type="text" value={currValues.description || ''} onChange={this.onChange.bind(this, todo, 'description')} placeholder="Description" />
                    <input type="text" value={currValues.comment || ''} onChange={this.onChange.bind(this, todo, 'comment')} placeholder="Comment" />
                    <input type="checkbox" checked={currValues.status === 'done'} onChange={this.onChange.bind(this, todo, 'status')} />
                    <button onClick={this.handleSaveClick.bind(this, todo.id)}>Save</button>
                    <button onClick={this.handleCancelClick.bind(this, todo.id)}>Cancel</button>
                </li>
                :
                <li key={todo.id} className={`todo-list__item todo-list__item--${todo.status}`} onClick={this.handleEditClick.bind(this, todo)}>
                    {todo.id + ' name: ' + todo.name}
                    <input type="checkbox" checked={todo.status === 'done'} onChange={this.onChange.bind(this, todo, 'status')} />
                    <button onClick={this.handleDeleteClick.bind(this, todo.id)}>Delete</button>
                </li>);
    }

    render() {
        const { listTodos, refetch } = this.props.data;

        return (
            <div>
                <button onClick={() => refetch()}>Refresh</button>
                <ul>{listTodos && [...listTodos.items].sort((a, b) => a.name.localeCompare(b.name)).map(this.renderTodo)}</ul>
            </div>
        );
    }
}

const AllTodosWithData = compose(
    graphql(ListTodos),
    graphqlMutation(UpdateTodo,
        ({ status }) => ({
            'auto': ListTodos,

            // When status is done, add to ListTodosByStatus(status: done), else add to ListTodosByStatus(status: pending)
            'add': status === 'done' ? { query: ListTodosByStatus, variables: { status: 'done' } } : { query: ListTodosByStatus, variables: { status: 'pending' } },

            // When status is done, remove from ListTodosByStatus(status: pending), else remove from ListTodosByStatus(status: done)
            'remove': status === 'done' ? { query: ListTodosByStatus, variables: { status: 'pending' } } : { query: ListTodosByStatus, variables: { status: 'done' } },
        }),
        'Todo'),
    graphqlMutation(DeleteTodo, {
        'auto': [
            ListTodos,
            { query: ListTodosByStatus, variables: { status: 'done' } },
            { query: ListTodosByStatus, variables: { status: 'pending' } }
        ]
    }, 'Todo')
)(Todos);

const TodosByStatus = ({ data: { queryTodosByStatusIndex: { items } = { items: [] } }, status }) => (
    <div>
        <strong>{status}</strong>
        <pre>
            {JSON.stringify(items, null, 2)}
        </pre>
    </div>
);

const TodosByStatusWithData = graphql(ListTodosByStatus)(TodosByStatus);

class AddTodo extends Component {
    state = { name: '', description: '' }

    onChange(event, type) {
        this.setState({
            [type]: event.target.value
        })
    }

    render() {
        return (
            <div>
                <input onChange={(event) => this.onChange(event, "name")} />
                <input onChange={(event) => this.onChange(event, "description")} />
                <button onClick={() => this.props.createTodo({
                    name: this.state.name,
                    description: this.state.description,
                    status: 'pending'
                })}>
                    Add
      </button>
            </div>
        );
    }
}

const AddTodoOffline = graphqlMutation(
    NewTodo,
    {
        'auto': [
            ListTodos,
            { query: ListTodosByStatus, variables: { status: 'pending' } }
        ],
    },
    'Todo'
)(AddTodo);

class App extends Component {
    render() {
        return (
            <div className="App">
                <AllTodosWithData />
                <AddTodoOffline />
                <hr />
                <table width="100%">
                    <tbody>
                        <tr>
                            <td width="50%"><TodosByStatusWithData status="done" /></td>
                            <td width="50%"><TodosByStatusWithData status="pending" /></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

const client = new AWSAppSyncClient({
    url: awsmobile.aws_appsync_graphqlEndpoint,
    region: awsmobile.aws_appsync_region,
    auth: {
        type: awsmobile.aws_appsync_authenticationType,
        apiKey: awsmobile.aws_appsync_apiKey
    }
})

const WithProvider = () => (
    <ApolloProvider client={client}>
        <Rehydrated>
            <App />
        </Rehydrated>
    </ApolloProvider>
)

export default WithProvider;
