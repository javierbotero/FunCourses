import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactRouterpropTypes from 'react-router-prop-types';
import { Link } from 'react-router-dom';

const Dashboard = props => {
  const {
    user,
    location,
    url,
    coursesToDivs,
  } = props;

  const displayPendings = (
    course,
    url,
    location,
  ) => course.pendings.map(p => {
    const student = course.pending_students.find(s => s.id === p.user_id);

    return (
      <div className="request" key={p.id}>
        <div>
          {'Course: '}
          <Link to={{
            pathname: `${url}/user/${course.id}`,
            state: { from: location },
          }}
          >
            {course.title}
          </Link>
        </div>
        <div>
          {'Student: '}
          <Link
            to={{
              pathname: `${url}/user/${course.id}`,
              state: { from: location },
            }}
          >
            {student.username}
          </Link>
        </div>
        <div>
          <button type="button">Accept</button>
          <button type="button">Ignore</button>
        </div>
      </div>
    );
  });

  const teacherCoursesToDivs = (courses, url, location) => courses.map(c => (
    <div className="teacher-course" key={c.id}>
      <h4>{c.title}</h4>
      <section>
        <h4>Enrollment Requests</h4>
        {displayPendings(c, url, location)}
      </section>
      <aside>
        <h4>Accepted Students</h4>
        <p>Total </p>
      </aside>
    </div>
  ));

  return (
    <div>
      <header>
        <h2>Dashboard</h2>
        <p>
          Hi
          {` ${user.username} `}
          !
        </p>
      </header>
      <main>
        <h3>Your Courses</h3>
        <div className="student">
          <h4>As a Student</h4>
          {coursesToDivs(user.courses_as_student)}
        </div>
        <div className="teacher">
          <h4>As a Teacher</h4>
          {teacherCoursesToDivs(user.courses, url, location)}
        </div>
      </main>
      <aside>
        <div>
          <h4>
            Friendship Requests
          </h4>
          <div>
            {}
          </div>
        </div>
      </aside>
    </div>
  );
};

Dashboard.propTypes = {
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
  coursesToDivs: PropTypes.func.isRequired,
  location: ReactRouterpropTypes.location.isRequired,
  url: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  user: state.user.user,
});

export default connect(mapStateToProps)(Dashboard);
