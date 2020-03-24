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
import {ThemeProvider} from '@material-ui/styles';
import theme from './theme'
import { ApolloProvider as ApolloHooksProvider } from "@apollo/react-hooks";

const client = new ApolloClient({
    uri: '/graphql'
});


ReactDOM.render(
    <Router>
        <ApolloProvider client={client}>
            <ApolloHooksProvider client={client}>
                <Provider store={store}>
                    <ThemeProvider theme={theme}>
                        <App/>
                    </ThemeProvider>
                </Provider>
            </ApolloHooksProvider>
        </ApolloProvider>
    </Router>, document.getElementById('root')
);

serviceWorker.unregister();
