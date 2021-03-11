import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import App from './containers/App';
import { getCourses, getUser } from './actions/retrievals';
import {
  initCreator,
  objThunk,
  tokenPayload,
  userPayload,
} from './helpers/helpers';
import {
  URL,
  TOKEN,
  ID,
} from './constants/constants';

ReactDOM.render(
  <Provider store={store}>
    <App
      getCourses={getCourses}
      getUser={getUser}
      objThunk={objThunk}
      token={TOKEN}
      id={ID}
      url={URL}
      tokenPayload={tokenPayload}
      userPayload={userPayload}
      initCreator={initCreator}
    />
  </Provider>,
  document.getElementById('root'),
);
