import React from 'react';
import ReactDOM from "react-dom";
import * as serviceWorker from './serviceWorker';
import store from "./redux/redux-store";
import {BrowserRouter as Router} from "react-router-dom";
import {Provider} from 'react-redux';
import './index.scss';
import App from './App';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';

const client = new ApolloClient({
    uri: '/graphql'
});

ReactDOM.render(
    <Router>
        <ApolloProvider client={client}>
            <Provider store={store}>
                <App/>
            </Provider>
        </ApolloProvider>
    </Router>, document.getElementById('root')
);

serviceWorker.unregister();
