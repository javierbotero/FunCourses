import React from 'react';
import {
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Course from '../components/Course';
import User from '../components/User';
import { useAuth } from '../helpers/authHelpers';
import { resetStateCourses } from '../reducers/courses';
import { resetStateUser } from '../reducers/user';
import Courses from '../components/Courses';
import Dashboard from '../components/Dashboard';
import FormCourse from '../components/FormCourse';
import Report from '../components/Report';
import { createLike, deleteLike } from '../actions/creators';

const Main = props => {
  const {
    courses,
    user,
    match,
    location,
    resetCourses,
    resetUser,
    objThunk,
    userPayload,
    tokenPayload,
    id,
    token,
    urlApi,
    sendLike,
    delLike,
    commentsToDivsWithCourse,
    commentsToDivs,
    usersListToDiv,
    isFavorite,
  } = props;
  const { path, url } = match;
  const objAuth = useAuth();
  const handleLike = (userId, courseId, cb, favorites) => {
    const init = {
      ...tokenPayload(id, token),
      ...userPayload(userId, objAuth.userPassword),
    };
    const favorite = cb(favorites, userId);
    if (favorite) {
      const payload = objThunk(urlApi, 'DELETE', init);
      payload.id = favorite.id;
      delLike(payload);
    } else {
      const payload = objThunk(urlApi, 'POST', { ...init, course_id: courseId });
      sendLike(payload);
    }
  };
  const coursesToDivs = courses => courses.map(course => (
    <div key={course.id}>
      <div>Some picture</div>
      <div>{course.title}</div>
      <div>
        <button type="button" onClick={() => handleLike(objAuth.userId, course.id, isFavorite, course.favorites)}>
          <FontAwesomeIcon icon={
            isFavorite(course.favorites, objAuth.userId) ? 'heart' : ['far', 'heart']
            }
          />
        </button>
        {` ${course.favorites.length}`}
      </div>
      <div>
        <Link to={{
          pathname: `${url}/course/${course.id}`,
          state: { from: location },
        }}
        >
          More Info
        </Link>
      </div>
    </div>
  ));

  return (
    <div>
      <Switch>
        <Route exact path={`${path}`}>
          <Courses
            coursesToDivs={coursesToDivs}
            courses={courses}
            url={url}
            location={location}
            useAuth={useAuth}
            resetUser={resetUser}
            resetCourses={resetCourses}
            isFavorite={isFavorite}
          />
        </Route>
        <Route
          exact
          path={`${path}/course/:id`}
          render={({ match, location }) => (
            <Course
              match={match}
              courses={courses}
              location={location}
              url={url}
              usersListToDiv={usersListToDiv}
              commentsToDivs={commentsToDivs}
              useAuth={useAuth}
              isFavorite={isFavorite}
              handleLike={handleLike}
            />
          )}
        />
        <Route
          exact
          path={`${path}/user/:id`}
          render={({ match, location }) => (
            <User
              match={match}
              location={location}
              url={url}
              user={user}
              coursesToDivs={coursesToDivs}
              commentsToDivsWithCourse={commentsToDivsWithCourse}
            />
          )}
        />
        <Route
          exact
          path={`${path}/dashboard`}
          render={({ location }) => (
            <Dashboard
              user={user}
              location={location}
              url={url}
              coursesToDivs={coursesToDivs}
              usersListToDiv={usersListToDiv}
            />
          )}
        />
        <Route
          exact
          path={`${path}/create`}
          render={({ location }) => (
            <FormCourse
              location={location}
              userId={objAuth.userId}
              password={objAuth.userPassword}
              id={id}
              token={token}
              username={user.username}
              urlApi={urlApi}
              objThunk={objThunk}
              userPayload={userPayload}
              tokenPayload={tokenPayload}
            />
          )}
        />
        <Route
          exact
          path={`${url}/report`}
          render={({ location }) => (
            <Report
              location={location}
              url={url}
              user={user}
            />
          )}
        />
      </Switch>
    </div>
  );
};

Main.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
  location: ReactRouterPropTypes.location.isRequired,
  courses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    teacher_id: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    dates: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    created_at: PropTypes.string.isRequired,
    updated_at: PropTypes.string.isRequired,
    teacher: PropTypes.shape({
      id: PropTypes.number,
      username: PropTypes.string,
    }).isRequired,
    favorites: PropTypes.arrayOf(PropTypes.shape({
      course_id: PropTypes.number,
      user_id: PropTypes.number,
    })).isRequired,
    subscriptions: PropTypes.arrayOf(PropTypes.shape({
      course_id: PropTypes.number,
      user_id: PropTypes.number.isRequired,
      confirmed: PropTypes.bool,
    })).isRequired,
    comments: PropTypes.arrayOf(PropTypes.shape({
      user_id: PropTypes.number,
      course_id: PropTypes.number,
      body: PropTypes.string,
    })).isRequired,
    pendings: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      user_id: PropTypes.number,
      course_id: PropTypes.number,
      confirmed: PropTypes.bool,
    })).isRequired,
  })).isRequired,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    courses_as_student: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      teacher_id: PropTypes.number.isRequired,
      status: PropTypes.string.isRequired,
      dates: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      created_at: PropTypes.string.isRequired,
      updated_at: PropTypes.string.isRequired,
      teacher: PropTypes.shape({
        id: PropTypes.number,
        username: PropTypes.string,
      }).isRequired,
      favorites: PropTypes.arrayOf(PropTypes.shape({
        course_id: PropTypes.number,
        user_id: PropTypes.number,
      })).isRequired,
      subscriptions: PropTypes.arrayOf(PropTypes.shape({
        course_id: PropTypes.number,
        user_id: PropTypes.number.isRequired,
        confirmed: PropTypes.bool,
      })).isRequired,
      comments: PropTypes.arrayOf(PropTypes.shape({
        user_id: PropTypes.number,
        course_id: PropTypes.number,
        body: PropTypes.string,
      })).isRequired,
      pendings: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        user_id: PropTypes.number,
        course_id: PropTypes.number,
        confirmed: PropTypes.bool,
      })).isRequired,
    })).isRequired,
    pending_courses_as_student: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      teacher_id: PropTypes.number.isRequired,
      dates: PropTypes.string.isRequired,
    })).isRequired,
    comments: PropTypes.arrayOf(PropTypes.shape({
      body: PropTypes.string.isRequired,
      course_id: PropTypes.number.isRequired,
    })).isRequired,
    favorites: PropTypes.arrayOf(PropTypes.shape({
      course_id: PropTypes.number,
    })).isRequired,
    courses: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      teacher_id: PropTypes.number.isRequired,
      status: PropTypes.string.isRequired,
      dates: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      created_at: PropTypes.string.isRequired,
      updated_at: PropTypes.string.isRequired,
      teacher: PropTypes.shape({
        id: PropTypes.number,
        username: PropTypes.string,
      }).isRequired,
      favorites: PropTypes.arrayOf(PropTypes.shape({
        course_id: PropTypes.number,
        user_id: PropTypes.number,
      })).isRequired,
      subscriptions: PropTypes.arrayOf(PropTypes.shape({
        course_id: PropTypes.number,
        user_id: PropTypes.number.isRequired,
        confirmed: PropTypes.bool,
      })).isRequired,
      comments: PropTypes.arrayOf(PropTypes.shape({
        user_id: PropTypes.number,
        course_id: PropTypes.number,
        body: PropTypes.string,
      })).isRequired,
      pendings: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        user_id: PropTypes.number,
        course_id: PropTypes.number,
        confirmed: PropTypes.bool,
      })).isRequired,
    })),
  }).isRequired,
  resetUser: PropTypes.func.isRequired,
  resetCourses: PropTypes.func.isRequired,
  objThunk: PropTypes.func.isRequired,
  userPayload: PropTypes.func.isRequired,
  tokenPayload: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  token: PropTypes.string.isRequired,
  urlApi: PropTypes.string.isRequired,
  sendLike: PropTypes.func.isRequired,
  delLike: PropTypes.func.isRequired,
  commentsToDivsWithCourse: PropTypes.func.isRequired,
  commentsToDivs: PropTypes.func.isRequired,
  usersListToDiv: PropTypes.func.isRequired,
  isFavorite: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  resetCourses: () => dispatch(resetStateCourses()),
  resetUser: () => dispatch(resetStateUser()),
  sendLike: payload => dispatch(createLike(payload)),
  delLike: payload => dispatch(deleteLike(payload)),
});

export default connect(null, mapDispatchToProps)(Main);
