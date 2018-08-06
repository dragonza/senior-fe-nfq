import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { connectRouter, routerMiddleware } from 'connected-react-router';
// import Immutable from 'immutable';
import rootSaga from '../sagas';
import rootReducer from '../reducers';

// const rootReducer = combineReducers({ laneList: reducers });

export function configureStore({ history }) {
  const sagaMiddleware = createSagaMiddleware();
  const composeEnhancer =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    connectRouter(history)(rootReducer),
    composeEnhancer(applyMiddleware(routerMiddleware(history), sagaMiddleware))
  );
  sagaMiddleware.run(rootSaga);

  return store;
}
