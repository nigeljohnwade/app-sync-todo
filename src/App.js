import React, {
    Component
} from 'react';
import AWSAppSyncClient from 'aws-appsync';
import { Rehydrated } from 'aws-appsync-react';
import { ApolloProvider } from 'react-apollo';
import whyDidYouRender from '@welldone-software/why-did-you-render/dist/no-classes-transpile/umd/whyDidYouRender.min.js';
import { Auth } from 'aws-amplify';

import AllTodosWithData from 'providers/AllTodosWithData';
import AddTodoOffline from 'providers/AddTodoOffline';
import TodosByStatusWithData from 'providers/TodosByStatusWithData';
import awsmobile from 'config/aws';

import 'App.css';

whyDidYouRender(React);

class App extends Component {
    static whyDidYouRender = {
        logOnDifferentValues: true,
    };

    render() {
        return (
            <div className="main stack">
                <header className="row">
                    <h1>To-Do List</h1>
                    <AddTodoOffline />
                </header>
                <AllTodosWithData />
                <div className="row flex-wrap">
                    <TodosByStatusWithData status="pending" />
                    <TodosByStatusWithData status="doing" />
                    <TodosByStatusWithData status="done" />
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
        jwtToken: async () => (await Auth.currentSession()).getIdToken().getJwtToken(),
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
