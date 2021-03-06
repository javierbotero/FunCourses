import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { library, dom } from '@fortawesome/fontawesome-svg-core';
import {
  faHeart as fasFaHeart,
  faBars as fasFaBars,
  faEllipsisV as fasFaEllipsisV,
  faChevronDown as fasFaChevronDown,
  faChevronLeft as fasFaChevronLeft,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart as farFaHeart } from '@fortawesome/free-regular-svg-icons';
import {
  faLinkedin,
  faFacebook,
  faTwitterSquare,
  faInstagramSquare,
} from '@fortawesome/free-brands-svg-icons';
import FormComponent from '../components/Form';
import Landing from '../components/Landing';
import Main from './Main';
import {
  handleApiRequest,
  commentsToDivsWithCourse,
  commentsToDivs,
  usersListToDiv,
  isPresentInUserId,
  isPresentInId,
  isFriendshipRequested,
  findCourses,
  findCoursesFromCoursesId,
  mainUrl,
  picturesToDivs,
} from '../helpers/helpers';
import authenticate from '../helpers/authHelpers';
import { removeCourseError, removeNotificationCourses } from '../reducers/courses';
import {
  removeUserError,
  removeNotificationUser,
} from '../reducers/user';
import '../css/style.css';

library.add(
  fasFaHeart,
  farFaHeart,
  faLinkedin,
  faFacebook,
  faTwitterSquare,
  faInstagramSquare,
  fasFaBars,
  fasFaEllipsisV,
  fasFaChevronDown,
  fasFaChevronLeft,
);
dom.watch();

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
  const dispatch = useDispatch();
  const courses = useSelector(state => state.courses.courses);
  const user = useSelector(state => state.user.user);
  const statusUser = useSelector(state => state.user.status);
  const statusCourses = useSelector(state => state.courses.status);
  const errorCourses = useSelector(state => state.courses.error);
  const errorUser = useSelector(state => state.user.error);
  const notificationUser = useSelector(state => state.user.notification);
  const notificationCourses = useSelector(state => state.courses.notification);
  const loading = useSelector(state => state.user.loading);
  const tokenData = tokenPayload(id, token);
  const userId = useSelector(state => state.user.user.id);
  const userPassword = useSelector(state => state.user.password);
  const userData = userPayload(userId, userPassword);
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
      <Landing />
    </div>
  );
  useEffect(() => {
    if (userId && userPassword) {
      if (statusCourses === 'idle') {
        dispatch(getCourses(dataThunkCourses));
      }
      if (statusUser === 'idle') {
        dispatch(getUser(dataThunkUser));
      }
    }
  }, [statusCourses, getCourses, getUser, dispatch, dataThunkCourses, dataThunkUser, statusUser]);

  const removeErrorOrNotification = () => {
    if (errorCourses.length > 0) { dispatch(removeCourseError()); }
    if (errorUser.length > 0) { dispatch(removeUserError()); }
    if (notificationUser.length > 0) { dispatch(removeNotificationUser()); }
    if (notificationCourses.length > 0) { dispatch(removeNotificationCourses()); }
  };

  return (
    <div onPointerDown={removeErrorOrNotification}>
      <BrowserRouter>
        <div className={errorCourses.length > 0 || errorUser.length > 0 ? 'error' : ''}>
          {errorCourses.length > 0 ? `${errorCourses}. ` : ''}
          {errorUser}
        </div>
        <div className={notificationUser.length > 0 || notificationCourses.length > 0 ? 'notification' : ''}>
          {notificationUser}
          {notificationCourses}
        </div>
        <div className={loading ? 'loading' : ''} />
        <Switch>
          <Route
            exact
            path="/"
            render={({ location }) => {
              if (userId && userPassword) {
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
              if (userId && userPassword) {
                if (user.status) {
                  return (
                    <Main
                      match={match}
                      courses={courses}
                      user={user}
                      location={location}
                      objThunk={objThunk}
                      userPayload={userPayload}
                      tokenPayload={tokenPayload}
                      id={id}
                      token={token}
                      urlApi={url}
                      commentsToDivsWithCourse={commentsToDivsWithCourse}
                      commentsToDivs={commentsToDivs}
                      usersListToDiv={usersListToDiv}
                      isPresentInUserId={isPresentInUserId}
                      isPresentInId={isPresentInId}
                      isFriendshipRequested={isFriendshipRequested}
                      findCourses={findCourses}
                      findCoursesFromCoursesId={findCoursesFromCoursesId}
                      mainUrl={mainUrl}
                      picturesToDivs={picturesToDivs}
                      userId={userId}
                      userPassword={userPassword}
                    />
                  );
                }
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
            render={({ location, match, history }) => {
              if (userId && userPassword) {
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
                  <FormComponent
                    initCreator={initCreator}
                    tokenPayload={tokenPayload}
                    handleApiRequest={handleApiRequest}
                    id={id}
                    token={token}
                    url={url}
                    match={match}
                    history={history}
                    authenticate={authenticate}
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
