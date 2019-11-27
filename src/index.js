import React from 'react';
import ReactDOM from 'react-dom';
import { Authenticator } from 'aws-amplify-react';
import Amplify from 'aws-amplify';

import App from './App';
import * as serviceWorker from 'serviceWorker';
import awsmobile from 'config/aws';

import 'index.css';

Amplify.configure(awsmobile);

ReactDOM.render(
    <Authenticator>
        <App />
    </Authenticator>
    , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
