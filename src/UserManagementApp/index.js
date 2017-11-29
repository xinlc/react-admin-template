import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux';
import BaseConfig from '../config/baseConfig';
import routes from '../config/routes';
import reducers from './reducers';
import sagas from './services';
// import { initUser } from './actions/user';

const middlewares = [];

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
middlewares.push(routerMiddleware(history));

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();
middlewares.push(sagaMiddleware);

// create the logger middleware when debugging
if (BaseConfig.debug) {
  const { createLogger } = require('redux-logger');
  const logger = createLogger({ // https://github.com/evgenyrodionov/redux-logger#options
    diff: false,
  });
  middlewares.push(logger);
}

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer,
  }),
  applyMiddleware(...middlewares)
);

// then run the saga
sagaMiddleware.run(sagas);


// Now you can dispatch navigation actions from anywhere!
// store.dispatch(push('/foo'))

// initial user
// store.dispatch(initUser());

// Render the main component into the dom
export default () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        {routes}
      </ConnectedRouter>
    </Provider>
  );
};

/* eslint-disable */
const ready = function() {
  // ready...
};

const completed = function () {
  document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
  ready();
};

if ( document.readyState === "complete" ||
  ( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {
  // Handle it asynchronously to allow scripts the opportunity to delay ready
  window.setTimeout( ready );
} else {
  // Use the handy event callback
  document.addEventListener( "DOMContentLoaded", completed );
  // A fallback to window.onload, that will always work
  window.addEventListener( "load", completed );
}
