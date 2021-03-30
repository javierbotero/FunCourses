import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import dashCss from '../css/Dashboard.module.css';
import CoursesCss from '../css/Courses.module.css';
import avatarImage from '../assets/images/avatar.jpg';

const Dashboard = props => {
  const {
    courses,
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
    findCoursesFromCoursesId,
    findCourses,
    mainUrl,
    setShowMenu,
  } = props;
  const objAuth = useAuth();

  const displayPendingSubscriptions = (
    course,
    url,
    location,
  ) => course.pendings.map(p => {
    const student = course.pending_students.find(s => s.id === p.user_id);
    return (
      <div className={`${dashCss.request}`} key={p.id}>
        <div>
          <Link
            to={{
              pathname: `${url}/user/${student.id}`,
              state: {
                from: location,
                user: {
                  id: student.id,
                  username: student.username,
                },
              },
            }}
          >
            <div
              className="avatar"
              style={{
                backgroundImage: student.url_avatar ? `url(${urlApi}${student.url_avatar.slice(1, student.url_avatar.length)})` : `url(${avatarImage})`,
              }}
            />
            <div className={dashCss.username}>{student.username}</div>
          </Link>
        </div>
        <div className={dashCss.acceptance}>
          <button
            className="button-3"
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
            className="button-3"
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
    <div className={`${dashCss.teacherCourse}`} key={c.id}>
      <header className={`${dashCss.headerCourse}`}>
        <div
          className="course"
          style={{
            backgroundImage: `url(${mainUrl(c)})`,
          }}
        />
        <h4 className={`${dashCss.titleCourse}`}>{c.title}</h4>
        <a className={`${dashCss.join} button-2`} href={c.link}>Join Class</a>
      </header>
      <section className={`${dashCss.sectionCourse}`}>
        <h4>
          {c.pendings.length}
          {' Enrollment Requests'}
        </h4>
        <div className={`${dashCss.scrollUsers}`}>
          {displayPendingSubscriptions(c, url, location)}
        </div>
      </section>
      <section className={`${dashCss.sectionCourse}`}>
        <h4>
          {c.subscriptions.length}
          {' Accepted Students'}
        </h4>
        <div className={`${dashCss.scrollUsers}`}>
          {usersListToDiv(c.confirmed_students, location, url)}
        </div>
      </section>
    </div>
  ));

  const displayPendingFriendships = (students, requests, location) => requests.map((r, i) => {
    const student = students.find(s => s.id === r.sender_id);
    return (
      <div className={`${dashCss.request}`} key={r.id}>
        <Link
          to={{
            pathname: `${url}/user/${student.id}`,
            state: { from: location },
          }}
        >
          <div
            style={{
              backgroundImage: student.url_avatar ? `url(${urlApi}${student.url_avatar.slice(1, student.url_avatar.length)})` : `url(${avatarImage})`,
            }}
            className="avatar"
          />
          <div className={dashCss.username}>
            {student.username}
          </div>
        </Link>
        <div className={dashCss.acceptance}>
          <button
            className="button-3"
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
            className="button-3"
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
  const completeInfoCourses = (courses, userCourses, cb) => {
    const found = cb(courses, userCourses);
    return found.map(f => {
      const userCourse = userCourses.find(c => c.id === f.id);
      return {
        ...f,
        link: userCourse.link,
        provider: userCourse.provider,
      };
    });
  };

  return (
    <div className={`${dashCss.container}`}>
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
          Dashboard
        </div>
        <button className="removeButtonStyles" type="button" onClick={() => setShowMenu(true)}>
          <FontAwesomeIcon icon="ellipsis-v" />
        </button>
      </nav>
      <header className={`${dashCss.header}`}>
        <div className={`${CoursesCss.avatarZone}`}>
          <div
            className={`avatar ${CoursesCss.avatarPic}`}
            style={{
              backgroundImage: user.url_avatar ? `url(${urlApi}${user.url_avatar.slice(1, user.url_avatar.length)})` : `url(${avatarImage})`,
            }}
          />
          <h4 className={dashCss.welcome}>
            {'Hi '}
            {user.username}
            !
          </h4>
        </div>
      </header>
      <main className={`${dashCss.main}`}>
        <h3>Courses</h3>
        <section className={`${dashCss.interactions}`}>
          <h4>As a Student</h4>
          <div className={`${dashCss.studentCourses}`}>
            {coursesToDivs(findCourses(courses, user.courses_as_student), url, location, true)}
          </div>
        </section>
        <section className={`${dashCss.interactions}`}>
          <h4>As a Teacher</h4>
          <div className="teacher">
            {teacherCoursesToDivs(
              completeInfoCourses(courses, user.courses, findCourses),
              url,
              location,
            )}
          </div>
        </section>
        <section className={`${dashCss.interactions}`}>
          <h4>Favorites</h4>
          <div className="teacher">
            {coursesToDivs(findCoursesFromCoursesId(courses, user.favorites), url, location)}
          </div>
        </section>
      </main>
      <aside className={`${dashCss.aside}`}>
        <h3>Friendship Requests</h3>
        <section className={`${dashCss.interactions}`}>
          <div className={dashCss.requests}>
            {displayPendingFriendships(
              user.friendship_requests,
              user.pending_to_accept_friendships,
              location,
            )}
          </div>
        </section>
      </aside>
    </div>
  );
};

Dashboard.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    url_avatar: PropTypes.string.isRequired,
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
  findCoursesFromCoursesId: PropTypes.func.isRequired,
  findCourses: PropTypes.func.isRequired,
  mainUrl: PropTypes.func.isRequired,
  setShowMenu: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.user.user,
});

export default connect(mapStateToProps)(Dashboard);
export { Dashboard };
