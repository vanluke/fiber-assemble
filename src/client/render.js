import React from 'react';
import {hydrate} from 'react-dom';
import {Provider} from 'react-redux';
import {renderRoutes} from 'react-router-config';
import {BrowserRouter} from 'react-router-dom';
import {AppContainer} from 'react-hot-loader'; //eslint-disable-line
import routes from 'universal/routes';

hydrate(
  <AppContainer>
    <BrowserRouter>
      <Provider>
        {renderRoutes(routes)}
      </Provider>
    </BrowserRouter>
  </AppContainer>, document.getElementById('app'),
);

if (module.hot) {
  module.hot.accept();
}
