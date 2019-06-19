

/*
 src/index.js
*/
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import './index.sass';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ConnectedRouter } from 'connected-react-router'
import configureStore, { history } from './store'

const store = configureStore();

ReactDOM.render(

    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>

    ,
    document.getElementById('root')
);
// serviceWorker.unregister();
serviceWorker.register();
