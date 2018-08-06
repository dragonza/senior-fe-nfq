import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.scss';
import Routes from './routes';

ReactDOM.render(<Routes />, document.getElementById('root'));

// import React from 'react';
// import {render} from 'react-dom';
// import {Provider} from 'react-redux';
// import { createStore, applyMiddleware } from 'redux';
// import reduxApp from './reducers/';
// import createSagaMiddleware from 'redux-saga';
// import rootSaga from './sagas';
// import { hashHistory } from 'react-router-dom';
// import { syncHistoryWithStore } from 'connected-react-router';
// import { Router } from 'react-router';
// import routes from './routes';
// import 'whatwg-fetch'
//
// const initialState = {};
// const sagaMiddleware = createSagaMiddleware();
//
// let store = createStore(
//     reduxApp,
//     initialState,
//     applyMiddleware(sagaMiddleware));
//
// sagaMiddleware.run(rootSaga);
//
// const createSelectLocationState = () => {
//     let prevRoutingState, prevRoutingStateJS
//     return state => {
//         const routingState = state['routing']
//         if (typeof prevRoutingState === 'undefined' || prevRoutingState !== routingState) {
//             prevRoutingState = routingState
//         }
//         return prevRoutingState
//     }
// }
//
// const history = syncHistoryWithStore(hashHistory, store, {
//     selectLocationState: createSelectLocationState()
// })
//
// const createProvider = () => {
//     return (
//     <Provider store = {store} >
//         <Router history = {history} >{routes}</Router>
//     </Provider>
//     );
// };
//
// render(createProvider(), document.getElementById('root'));
