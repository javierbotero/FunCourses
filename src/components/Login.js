import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import history from '../helpers/history';
import Landing from './Landing';
import Form from './Form';

const Login = props => {
  const {
    initCreator,
    tokenPayload,
    id,
    token,
    url,
    handleApiRequest,
    setCurrentUserId,
    setCurrentUserPassword,
  } = props;

  return (
    <div className="login">
      <BrowserRouter history={history}>
        <Switch>
          <Route exact path="/">
            <div className="landing">
              <div className="logo">Logo</div>
              <header>
                <ul>
                  <li><Link to="/signup">Sign up</Link></li>
                  <li><Link to="/login">Log in</Link></li>
                </ul>
              </header>
              <Landing />
            </div>
          </Route>
          <Route
            exact
            path="/:identifier"
            render={({ match }) => (
              <Form
                setCurrentUserId={setCurrentUserId}
                setCurrentUserPassword={setCurrentUserPassword}
                initCreator={initCreator}
                tokenPayload={tokenPayload}
                id={id}
                token={token}
                url={url}
                handleApiRequest={handleApiRequest}
                match={match}
              />
            )}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

Login.propTypes = {
  initCreator: PropTypes.func.isRequired,
  tokenPayload: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  handleApiRequest: PropTypes.func.isRequired,
  setCurrentUserId: PropTypes.func.isRequired,
  setCurrentUserPassword: PropTypes.func.isRequired,
};

export default Login;
