import React from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Courses = props => {
  const {
    courses,
    coursesToDivs,
    location,
    url,
    useAuth,
    resetUser,
    resetCourses,
    avatar,
  } = props;
  const authObject = useAuth();
  const logout = () => {
    localStorage.removeItem('currentUserIdFunCourses');
    localStorage.removeItem('currentUserPasswordFunCourses');
    authObject.setUserId(null);
    authObject.setUserPassword(null);
    resetUser();
    resetCourses();
  };

  return (
    <div className="courses">
      <header>
        <div
          className="avatar"
          style={{
            backgroundImage: `url(${avatar})`,
          }}
        />
        <ul>
          <li>
            <Link to={{
              pathname: `${url}/dashboard`,
              state: { from: location },
            }}
            >
              Dashboard
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
      <div className="list-courses">
        {coursesToDivs(courses, FontAwesomeIcon)}
      </div>
    </div>
  );
};

Courses.propTypes = {
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
    })),
    pendings: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      user_id: PropTypes.number,
      course_id: PropTypes.number,
      confirmed: PropTypes.bool,
    })).isRequired,
  })).isRequired,
  coursesToDivs: PropTypes.func.isRequired,
  location: ReactRouterPropTypes.location.isRequired,
  url: PropTypes.string.isRequired,
  useAuth: PropTypes.func.isRequired,
  resetUser: PropTypes.func.isRequired,
  resetCourses: PropTypes.func.isRequired,
  urlApi: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

export default Courses;
