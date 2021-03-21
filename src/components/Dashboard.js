import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Link } from 'react-router-dom';

const Dashboard = props => {
  const {
    user,
    location,
    url,
    coursesToDivs,
    usersListToDiv,
    handleUpdateSubscription,
    objThunk,
    tokenPayload,
    userPayload,
    urlApi,
    id,
    token,
    useAuth,
    handleDeleteSubscription,
    isPresentInUserId,
    handleDelFriend,
    handleUpdFriend,
  } = props;
  const objAuth = useAuth();

  const displayPendingSubscriptions = (
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
            pathname: `${url}/course/${course.id}`,
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
          <button
            type="button"
            onClick={() => handleUpdateSubscription(
              student,
              p.id,
              objThunk,
              tokenPayload,
              userPayload,
              urlApi,
              id,
              token,
              objAuth.userId,
              objAuth.userPassword,
            )}
          >
            Accept
          </button>
          <button
            type="button"
            onClick={() => handleDeleteSubscription(
              id,
              token,
              urlApi,
              objThunk,
              objAuth.userId,
              objAuth.userPassword,
              course.id,
              student.id,
              course.pendings,
              tokenPayload,
              userPayload,
              isPresentInUserId,
            )}
          >
            Ignore
          </button>
        </div>
      </div>
    );
  });

  const teacherCoursesToDivs = (courses, url, location) => courses.map(c => (
    <div className="teacher-course" key={c.id}>
      <h4>{c.title}</h4>
      <section>
        <h4>Enrollment Requests</h4>
        {displayPendingSubscriptions(c, url, location)}
        <p>
          {c.pendings.length}
          {' students waiting'}
        </p>
      </section>
      <aside>
        <h4>Accepted Students</h4>
        <div>
          {usersListToDiv(c.confirmed_students, location, url)}
        </div>
        <p>
          {c.subscriptions.length}
          {' students are confirmed'}
        </p>
      </aside>
    </div>
  ));

  const displayPendingFriendships = (students, requests, location) => requests.map((r, i) => {
    const student = students.find(s => s.id === r.sender_id);
    return (
      <div className="request" key={r.id}>
        <div style={{ backgroundImage: 'url(#)' }}>
          avatar
        </div>
        <Link
          to={{
            pathname: `${url}/user/${student.id}`,
            state: { from: location },
          }}
        >
          {student.username}
        </Link>
        <div>
          <button
            type="button"
            onClick={() => {
              handleUpdFriend(
                tokenPayload,
                userPayload,
                id,
                token,
                objAuth.userId,
                objAuth.userPassword,
                urlApi,
                objThunk,
                {
                  id: r.id,
                  indexRequest: i,
                  studentId: student.id,
                  studentName: student.username,
                },
              );
            }}
          >
            Accept
          </button>
          <button
            type="button"
            onClick={() => handleDelFriend(
              tokenPayload,
              userPayload,
              id,
              token,
              objAuth.userId,
              objAuth.userPassword,
              urlApi,
              objThunk,
              {
                id: r.id,
                pendigRequested: false,
                indexRequest: i,
                studentId: student.id,
              },
            )}
          >
            Ignore
          </button>
        </div>
      </div>
    );
  });

  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to={{
              pathname: location.state ? location.state.from.pathname : `${url}`,
              state: { from: location },
            }}
            >
              &#60;
            </Link>
          </li>
        </ul>
      </nav>
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
            {displayPendingFriendships(
              user.friendship_requests,
              user.pending_to_accept_friendships,
              location,
            )}
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
      })),
      subscriptions: PropTypes.arrayOf(PropTypes.shape({
        course_id: PropTypes.number,
        user_id: PropTypes.number.isRequired,
        confirmed: PropTypes.bool,
      })),
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
      })),
    })),
  }).isRequired,
  coursesToDivs: PropTypes.func.isRequired,
  location: ReactRouterPropTypes.location.isRequired,
  url: PropTypes.string.isRequired,
  usersListToDiv: PropTypes.func.isRequired,
  handleUpdateSubscription: PropTypes.func.isRequired,
  objThunk: PropTypes.func.isRequired,
  tokenPayload: PropTypes.func.isRequired,
  userPayload: PropTypes.func.isRequired,
  urlApi: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  token: PropTypes.string.isRequired,
  useAuth: PropTypes.func.isRequired,
  handleDeleteSubscription: PropTypes.func.isRequired,
  isPresentInUserId: PropTypes.func.isRequired,
  handleDelFriend: PropTypes.func.isRequired,
  handleUpdFriend: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.user.user,
});

export default connect(mapStateToProps)(Dashboard);
export { Dashboard };
