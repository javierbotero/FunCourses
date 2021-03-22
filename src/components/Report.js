import React from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Link } from 'react-router-dom';

const Report = props => {
  const {
    user,
    location,
    url,
  } = props;
  const getMetrics = courses => {
    let students = 0;
    let pendings = 0;
    let favorites = 0;
    courses.forEach(c => {
      students += c.confirmed_students.length;
      pendings += c.pending_students.length;
      favorites += c.favorites.length;
    });
    return {
      students,
      pendings,
      favorites,
    };
  };
  const metrics = getMetrics(user.courses);
  return (
    <div className="report">
      <header>
        <ul>
          <li>
            <Link to={location.state ? location.state.from.pathname : `${url}`}>
              &#60;
            </Link>
          </li>
        </ul>
        <div>
          {'Hello '}
          {user.username}
          {', these are metrics of your actions'}
        </div>
      </header>
      <main>
        <div>
          <div>
            {'Courses created: '}
          </div>
          <div>
            {user.courses.length}
          </div>
        </div>
        <div>
          <div>
            {'Total Students: '}
          </div>
          <div>
            {metrics.students}
          </div>
        </div>
        <div>
          <div>
            {'Total students waiting for confirmation: '}
          </div>
          <div>
            {metrics.pendings}
          </div>
        </div>
        <div>
          <div>
            {'Total favorites received: '}
          </div>
          <div>
            {metrics.favorites}
          </div>
        </div>
        <div>
          <div>
            {'Courses as student: '}
          </div>
          <div>
            {user.courses_as_student.length}
          </div>
        </div>
        <div>
          <div>
            {'Total friends: '}
          </div>
          <div>
            {user.requests.length + user.pendings.length}
          </div>
        </div>
        <div>
          <div>
            {'Your comments: '}
          </div>
          <div>
            {user.comments.length}
          </div>
        </div>
        <div>
          <div>
            {'Your favorites: '}
          </div>
          <div>
            {user.favorites.length}
          </div>
        </div>
      </main>
    </div>
  );
};

Report.propTypes = {
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
    pending_to_accept_friendships: PropTypes.arrayOf(PropTypes.shape({
      receiver_id: PropTypes.number,
      sender_id: PropTypes.number,
    })).isRequired,
    friendship_requests: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      username: PropTypes.string,
      email: PropTypes.string,
    })).isRequired,
    requests: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        status: PropTypes.string,
        email: PropTypes.string,
        username: PropTypes.string,
        courses_as_student: PropTypes.arrayOf({
          id: PropTypes.number,
          title: PropTypes.string,
          content: PropTypes.string,
          favorites: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number,
            user_id: PropTypes.number,
            course_id: PropTypes.number,
          })),
        }),
      }),
    ).isRequired,
    pendings: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        status: PropTypes.string,
        email: PropTypes.string,
        username: PropTypes.string,
        courses_as_student: PropTypes.arrayOf({
          id: PropTypes.number,
          title: PropTypes.string,
          content: PropTypes.string,
          favorites: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number,
            user_id: PropTypes.number,
            course_id: PropTypes.number,
          })),
        }),
      }),
    ).isRequired,
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
    })),
  }).isRequired,
  location: ReactRouterPropTypes.location.isRequired,
  url: PropTypes.string.isRequired,
};

export default Report;
