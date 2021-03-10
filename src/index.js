import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import App from './containers/App';
import { getCourses } from './actions/retrievals';
import {
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
      objThunk={objThunk}
      token={TOKEN}
      id={ID}
      url={URL}
      tokenPayload={tokenPayload}
      userPayload={userPayload}
    />
  </Provider>,
  document.getElementById('root'),
);
