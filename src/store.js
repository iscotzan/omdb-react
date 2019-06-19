/*
 * src/store.js
 * With initialState
*/
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';

import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'connected-react-router'

export const history = createBrowserHistory()

export default function configureStore(preloadedState) {
  const store = createStore(
    rootReducer(history), // root reducer with router state
    preloadedState,
    compose(
      applyMiddleware(
        routerMiddleware(history), // for dispatching history actions
        // ... other middlewares ...
        thunk
      ),
    ),
  )

  return store
}
