import React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router/immutable';
import createHistory from 'history/createBrowserHistory';

import { configureStore } from './store/configure-store';
import App from './components/app';

export default function Routes() {
  const history = createHistory({
    basename: process.env.PUBLIC_URL
  });

  const store = configureStore({ history });

  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact path="/" component={App} />
          <Route component={() => <div>404 Not found 1</div>} />
        </Switch>
      </ConnectedRouter>
    </Provider>
  );
}

// import React from 'react';
// import { Route, IndexRoute } from 'react-router';
//
// import App from './components/app';
// import MainContainer from './containers/main-container';
//
// export default (
//     <Route path = "/" component = {App}>
//         <Route component = {MainContainer} />
//     </Route>
// )
