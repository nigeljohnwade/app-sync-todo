import React, { Component } from 'react';
import AWSAppSyncClient, { buildSubscription } from 'aws-appsync';
import {
    Rehydrated,
    graphqlMutation,
} from 'aws-appsync-react';
import { graphql } from 'react-apollo';
import ListTodos from './GraphQLAllTodos';
import NewTodo from './GraphQLNewTodo';
import awsmobile from './aws-exports';
import { ApolloProvider } from 'react-apollo';

import './App.css';

class Todos extends Component {
    render() {
        const {
            listTodos,
            refetch,
        } = this.props.data;
        return (
            <div>
                <button onClick={() => refetch()}>Refresh</button>
                <ul>
                    {listTodos && listTodos.items.map(todo => {
                        return <li key={todo.id}>{todo.id + ' name: ' + todo.name}</li>
                    })}
                </ul>
            </div>
        )
    }
}
const AllTodosWithData = graphql(ListTodos)(Todos);

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
const AddTodoOffline = graphqlMutation(NewTodo, ListTodos, 'Todo')(AddTodo);

class App extends Component {
    render() {
        return (
            <div className="App">
                <AllTodosWithData />
                <AddTodoOffline />
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
