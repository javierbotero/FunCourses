import React from 'react';
import { Link } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Course = props => {
  const {
    match,
    courses,
    location,
    url,
    usersListToDiv,
    commentsToDivs,
    useAuth,
    isFavorite,
  } = props;
  const objAuth = useAuth();
  const course = courses.find(c => c.id === parseInt(match.params.id, 10));
  const dates = course.dates.split(' ').slice(0, -1);
  const start = () => {
    if (dates.length > 0) {
      const date = new Date(dates[dates.length - 2]);
      return date.toLocaleDateString();
    }
    return 'No date for now';
  };
  const finish = () => {
    if (dates.length > 0) {
      const date = new Date(dates[dates.length - 1]);
      return date.toLocaleDateString();
    }
    return 'No date for now';
  };

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
              state: {
                from: location,
                user: course.teacher,
              },
            }}
          >
            Teacher:
            {` ${course.teacher.username}`}
          </Link>
        </div>
      </div>
      <div>
        Start:
        {` ${start()}`}
        <br />
        End:
        {` ${finish()}`}
      </div>
      <div>{course.content}</div>
      <div>
        status:
        {` ${course.status}`}
      </div>
      <div>
        price:
        {` $${course.price}`}
      </div>
      <div>
        <button type="button">
          <FontAwesomeIcon icon={
            isFavorite(course.favorites, objAuth.userId) ? 'heart' : ['far', 'heart']
            }
          />
        </button>
        { ` ${course.favorites.length}`}
      </div>
      <div>
        {!course.confirmed_students.some(s => s.id === objAuth.userId)
        && !course.pending_students.some(s => s.id === objAuth.userId)
        && course.status !== 'Closed'
        && (
          <button type="button">Subscribe</button>
        ) }
      </div>
      <div>
        <div>
          <h4>Students confirmed</h4>
          <div>{usersListToDiv(course.confirmed_students)}</div>
        </div>
        <div>
          <h4>Students waiting for confirmation</h4>
          <div>{usersListToDiv(course.pending_students)}</div>
        </div>
      </div>
      <div>
        <h4>Comments</h4>
        <div>{commentsToDivs(course.comments)}</div>
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
  usersListToDiv: PropTypes.func.isRequired,
  commentsToDivs: PropTypes.func.isRequired,
  useAuth: PropTypes.func.isRequired,
  isFavorite: PropTypes.func.isRequired,
};

export default Course;
