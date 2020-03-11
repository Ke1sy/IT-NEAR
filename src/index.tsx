import React from 'react';
import ReactDOM from "react-dom";
import * as serviceWorker from './serviceWorker';
import store from "./redux/redux-store";
import {BrowserRouter as Router} from "react-router-dom";
import {Provider} from 'react-redux';
import './index.scss';
import App from './App';

ReactDOM.render(
    <Router>
        <Provider store={store}>
            <App/>
        </Provider>
    </Router>, document.getElementById('root')
);

serviceWorker.unregister();
