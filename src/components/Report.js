import React from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Dashboard from '../css/Dashboard.module.css';
import report from '../css/Report.module.css';
import Circle from './Circle';

const Report = props => {
  const {
    user,
    location,
    url,
    findCourses,
    courses,
    setShowMenu,
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
  const metrics = getMetrics(findCourses(courses, user.courses));
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const maxCoursesMonth = (courses, max) => {
    let total = 0;
    courses.forEach(c => {
      if (c.dates) {
        const dates = c.dates.split(' ').slice(0, -1);
        if (dates.length > 0) {
          const date = new Date(dates[dates.length - 2]);
          const today = new Date();
          const month = date.getMonth();
          const year = date.getFullYear();
          const todayMonth = today.getMonth();
          const todayYear = today.getFullYear();
          if (month === todayMonth && year === todayYear) {
            total += 1;
          }
        }
      }
    });
    const result = (total / max) * 100;
    return {
      percentage: result > 100 ? 100 : result,
      total,
    };
  };
  return (
    <div>
      <nav className="navMenu">
        <div>
          <Link to={{
            pathname: location.state ? location.state.from.pathname : `${url}`,
            state: { from: location },
          }}
          >
            &#60;
          </Link>
        </div>
        <div>
          Report
        </div>
        <button className="removeButtonStyles" type="button" onClick={() => setShowMenu(true)}>
          <FontAwesomeIcon icon="ellipsis-v" />
        </button>
      </nav>
      <div className={report.report}>
        <header className={`${Dashboard.header} ${report.header}`}>
          <div>
            {'Hello '}
            {user.username}
            {', these are metrics of your actions'}
          </div>
        </header>
        <main className={report.main}>
          <div className={report.field}>
            <div>
              {`Courses opened in: ${months[new Date().getMonth()]}`}
            </div>
            <div>
              <Circle quantity={maxCoursesMonth(
                findCourses(courses, user.courses),
                5,
              )
                .percentage}
              />
              {maxCoursesMonth(findCourses(courses, user.courses)).total}
            </div>
          </div>
          <div className={report.field}>
            <div>
              {'Total Students: '}
            </div>
            <div>
              {metrics.students}
            </div>
          </div>
          <div className={report.field}>
            <div>
              {'Total students waiting for confirmation: '}
            </div>
            <div>
              {metrics.pendings}
            </div>
          </div>
          <div className={report.field}>
            <div>
              {'Total favorites received: '}
            </div>
            <div>
              {metrics.favorites}
            </div>
          </div>
          <div className={report.field}>
            <div>
              {`Taking courses in: ${months[new Date().getMonth()]}`}
            </div>
            <div>
              <Circle
                quantity={maxCoursesMonth(
                  findCourses(courses, user.courses_as_student),
                  10,
                ).percentage}
              />
              {maxCoursesMonth(findCourses(courses, user.courses_as_student)).total}
            </div>
          </div>
          <div className={report.field}>
            <div>
              {'Total friends: '}
            </div>
            <div>
              {user.requests.length + user.pendings.length}
            </div>
          </div>
          <div className={report.field}>
            <div>
              {'Your comments: '}
            </div>
            <div>
              {user.comments.length}
            </div>
          </div>
          <div className={report.field}>
            <div>
              {'Your favorites: '}
            </div>
            <div>
              {user.favorites.length}
            </div>
          </div>
        </main>
      </div>
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
  location: ReactRouterPropTypes.location.isRequired,
  url: PropTypes.string.isRequired,
  findCourses: PropTypes.func.isRequired,
  setShowMenu: PropTypes.func.isRequired,
};

export default Report;
