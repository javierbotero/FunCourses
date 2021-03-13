import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Form from '../components/Form';
import Landing from '../components/Landing';
import { useAuth } from '../helpers/authHelpers';
import Main from './Main';
import { handleApiRequest } from '../helpers/helpers';

const App = props => {
  const {
    getCourses,
    getUser,
    objThunk,
    url,
    token,
    id,
    tokenPayload,
    userPayload,
    initCreator,
  } = props;
  const authObject = useAuth();
  const dispatch = useDispatch();
  const courses = useSelector(state => state.courses.courses);
  const statusUser = useSelector(state => state.user.status);
  const statusCourses = useSelector(state => state.courses.status);
  const errorCourses = useSelector(state => state.courses.error);
  const errorUser = useSelector(state => state.user.error);
  const tokenData = tokenPayload(id, token);
  const userData = userPayload(authObject.userId, authObject.userPassword);
  const dataThunkCourses = objThunk(
    url,
    'POST',
    {
      ...tokenData,
    },
  );
  const dataThunkUser = objThunk(
    url,
    'POST',
    {
      ...tokenData,
      ...userData,
    },
  );
  const landingInfo = (
    <div className="landing">
      <div className="logo">Logo</div>
      <header>
        <ul>
          <li><Link to="/signup">Sign up</Link></li>
          <li><Link to="/login">Log in</Link></li>
        </ul>
        <h1>Find a fun course!</h1>
      </header>
      <Landing />
    </div>
  );
  useEffect(() => {
    if (authObject.userId && authObject.userPassword) {
      if (statusCourses === 'idle') {
        dispatch(getCourses(dataThunkCourses));
      }
      if (statusUser === 'idle') {
        dispatch(getUser(dataThunkUser));
      }
    }
  }, [statusCourses, getCourses, getUser, dispatch, dataThunkCourses, dataThunkUser, statusUser]);

  return (
    <div>
      <BrowserRouter>
        <div className={errorCourses.length > 0 || errorUser.length > 0 ? 'error' : ''}>
          {errorCourses.length > 0 ? `${errorCourses}. ` : ''}
          {errorUser}
        </div>
        <Switch>
          <Route
            exact
            path="/"
            render={({ location }) => {
              if (authObject.userId && authObject.userPassword) {
                return (
                  <Redirect
                    to={{
                      pathname: '/app',
                      state: { from: location },
                    }}
                  />
                );
              }
              return landingInfo;
            }}
          />
          <Route
            path="/app"
            render={({ match, location }) => {
              if (authObject.userId && authObject.userPassword) {
                return (
                  <Main
                    match={match}
                    courses={courses}
                    location={location}
                  />
                );
              }
              return (
                <Redirect
                  to={{
                    pathname: '/login',
                    state: { from: location },
                  }}
                />
              );
            }}
          />
          <Route
            exact
            path="/:identifier"
            render={({ location, match }) => {
              if (authObject.userId && authObject.userPassword) {
                return (
                  <Redirect
                    to={{
                      pathname: '/app',
                      state: { from: location },
                    }}
                  />
                );
              }
              return (
                <div>
                  <header>
                    <ul>
                      <li><Link to="/signup">Sign up</Link></li>
                      <li><Link to="/login">Log in</Link></li>
                    </ul>
                  </header>
                  <Form
                    initCreator={initCreator}
                    tokenPayload={tokenPayload}
                    handleApiRequest={handleApiRequest}
                    id={id}
                    token={token}
                    url={url}
                    match={match}
                    useAuth={useAuth}
                  />
                </div>
              );
            }}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

App.propTypes = {
  getCourses: PropTypes.func.isRequired,
  getUser: PropTypes.func.isRequired,
  objThunk: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  tokenPayload: PropTypes.func.isRequired,
  userPayload: PropTypes.func.isRequired,
  initCreator: PropTypes.func.isRequired,
};

export default App;
