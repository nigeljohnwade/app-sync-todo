import React, { Component } from 'react';
import AWSAppSyncClient from 'aws-appsync';
import {
    Rehydrated,
} from 'aws-appsync-react';
import {
    ApolloProvider,
    graphql,
} from 'react-apollo';

import AllTodosWithData from 'providers/AllTodosWithData';
import AddTodoOffline from 'providers/AddTodoOffline';
import ListTodosByStatus from 'graphql/GraphQLAllTodosByStatus';
import awsmobile from 'aws-exports';

import 'App.css';

const TodosByStatus = ({ data: { queryTodosByStatusIndex: { items } = { items: [] } }, status }) => (
    <div>
        <strong>{status}</strong>
        <pre>
            {JSON.stringify(items, null, 2)}
        </pre>
    </div>
);

const TodosByStatusWithData = graphql(ListTodosByStatus)(TodosByStatus);

class App extends Component {
    render() {
        console.log(client);
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
