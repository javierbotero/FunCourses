import React from 'react';
import {
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import Course from '../components/Course';
import User from '../components/User';
import { useAuth } from '../helpers/authHelpers';
import { resetStateCourses } from '../reducers/courses';
import { resetStateUser } from '../reducers/user';
import Courses from '../components/Courses';
import Dashboard from '../components/Dashboard';

const Main = props => {
  const {
    courses,
    user,
    match,
    location,
    resetCourses,
    resetUser,
  } = props;
  const { path, url } = match;
  const authObject = useAuth();
  const coursesToDivs = courses => courses.map(course => (
    <div key={course.id}>
      <div>Some picture</div>
      <div>{course.title}</div>
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
  const logout = () => {
    localStorage.removeItem('currentUserIdFunCourses');
    localStorage.removeItem('currentUserPasswordFunCourses');
    authObject.setUserId(null);
    authObject.setUserPassword(null);
    resetUser();
    resetCourses();
  };

  return (
    <div>
      <header>
        <div className="avatar">Avatar</div>
        <ul>
          <li>
            <Link to={{
              pathname: `${url}`,
              state: { from: location },
            }}
            >
              Courses
            </Link>
          </li>
          <li>
            <Link to={{
              pathname: `${url}/dashboard`,
              state: { from: location },
            }}
            >
              Dasboard
            </Link>
          </li>
          <li>
            <Link to={{
              pathname: `${url}/create`,
              state: { from: location },
            }}
            >
              Create
            </Link>
          </li>
          <li>
            <Link to={{
              pathname: `${url}/report`,
              state: { from: location },
            }}
            >
              Report
            </Link>
          </li>
        </ul>
        <button type="button" onClick={logout}>Log out</button>
      </header>
      <Switch>
        <Route exact path={`${path}`}>
          <Courses
            coursesToDivs={coursesToDivs}
            courses={courses}
            url={url}
          />
        </Route>
        <Route
          exact
          path={`${path}/course/:id`}
          render={({ match, location }) => (
            <div>
              <nav>
                <ul>
                  <li>
                    <Link to={{
                      pathname: location.state.from ? location.state.from.pathname : '/app',
                      state: { from: location },
                    }}
                    >
                      &#60;
                    </Link>
                  </li>
                </ul>
              </nav>
              <Course match={match} courses={courses} location={location} url={url} />
            </div>
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
};

const mapDispatchToProps = dispatch => ({
  resetCourses: () => dispatch(resetStateCourses()),
  resetUser: () => dispatch(resetStateUser()),
});

export default connect(null, mapDispatchToProps)(Main);
