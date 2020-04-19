import React from 'react';
import ReactDOM from "react-dom";
import * as serviceWorker from './serviceWorker';
import store from "./redux/redux-store";
import {BrowserRouter as Router} from "react-router-dom";
import {Provider} from 'react-redux';
import './index.scss';
import App from './App';
import ApolloClient from 'apollo-boost';
import {ThemeProvider} from '@material-ui/styles';
import theme from './theme'
import {ApolloProvider as ApolloHooksProvider} from "@apollo/react-hooks";
import {SnackbarProvider} from 'notistack';

const client = new ApolloClient({
    uri: '/graphql'
});


ReactDOM.render(
    <Router>
        <ApolloHooksProvider client={client}>
            <Provider store={store}>
                <SnackbarProvider maxSnack={3} anchorOrigin={{vertical: 'bottom', horizontal: 'right',}} autoHideDuration={2000}>
                    <ThemeProvider theme={theme}>
                        <App/>
                    </ThemeProvider>
                </SnackbarProvider>
            </Provider>
        </ApolloHooksProvider>
    </Router>, document.getElementById('root')
);

serviceWorker.unregister();
