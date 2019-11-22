import React, { Component } from 'react';
import AWSAppSyncClient from 'aws-appsync';
import {
    Rehydrated,
} from 'aws-appsync-react';
import {
    ApolloProvider,
    graphql,
} from 'react-apollo';

import whyDidYouRender
    from '@welldone-software/why-did-you-render/dist/no-classes-transpile/umd/whyDidYouRender.min.js';

import AllTodosWithData from 'providers/AllTodosWithData';
import AddTodoOffline from 'providers/AddTodoOffline';
import TodosByStatusWithData from 'providers/TodosByStatusWithData';
import ListTodosByStatus from 'graphql/GraphQLAllTodosByStatus';
import awsmobile from 'config/aws';

import 'App.css';

whyDidYouRender(React);

class App extends Component {
    static whyDidYouRender = {
        logOnDifferentValues: true,
    };

    render() {
        console.log('render App');
        return (
            <div className="main">
                <h1>To-Do List</h1>
                <div className="row">
                    <AllTodosWithData/>
                    <AddTodoOffline/>
                    <TodosByStatusWithData status="done"/>
                    <TodosByStatusWithData status="pending"/>
                </div>
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
            <App/>
        </Rehydrated>
    </ApolloProvider>
)

export default WithProvider;
