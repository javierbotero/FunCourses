import React from 'react';
import { Link } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';
import PropTypes from 'prop-types';

const Course = props => {
  const {
    match,
    courses,
    location,
    url,
  } = props;
  const course = courses.find(c => c.id === parseInt(match.params.id, 10));

  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to={location.state ? location.state.from.pathname : `${url}`}>
              &#60;
            </Link>
          </li>
        </ul>
      </nav>
      <div>
        <div>{course.title}</div>
        <div>
          <Link
            to={{
              pathname: `${url}/user/${course.teacher_id}`,
              state: { from: location },
            }}
          >
            Teacher:
            {` ${course.teacher.username}`}
          </Link>
        </div>
      </div>
      <div>{course.content}</div>
      <div>
        status:
        {` ${course.status}`}
      </div>
    </div>
  );
};

Course.propTypes = {
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
  url: PropTypes.string.isRequired,
};

export default Course;
