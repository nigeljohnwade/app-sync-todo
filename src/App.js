import React, { Component } from 'react';
import AWSAppSyncClient, { buildSubscription } from 'aws-appsync';
import { Rehydrated, graphqlMutation } from 'aws-appsync-react';
import { graphql } from 'react-apollo';
import ListTodos from './GraphQLAllTodos';
import awsmobile from './aws-exports';
import { ApolloProvider } from 'react-apollo';

import './App.css';

class Todos extends Component {
    render() {
        const { listTodos, refetch } = this.props.data;
        return (
            <div>
                <button onClick={() => refetch()}>Refresh</button>
                <ul>{listTodos && listTodos.items.map(todo => <li key={todo.id}>{todo.id + ' name: ' + todo.name}</li>)}</ul>
            </div>
        )
    }
}
const AllTodosWithData = graphql(ListTodos)(Todos);

class App extends Component {
    render() {
        return (
            <div className="App">
                <AllTodosWithData />
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
