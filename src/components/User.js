import React, { useEffect } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '../css/User.module.css';
import course from '../css/Course.module.css';
import avatarImage from '../assets/images/avatar.jpg';

const User = props => {
  const {
    courses,
    user,
    match,
    location,
    url,
    coursesToDivs,
    commentsToDivsWithCourse,
    handleCreateFriendship,
    tokenPayload,
    userPayload,
    id,
    token,
    urlApi,
    objThunk,
    isFriendshipRequested,
    handleDelFriend,
    findCourses,
    setShowMenu,
    userId,
    userPassword,
  } = props;
  useEffect(() => {
    const deskTopMenu = document.querySelector('.desktopMenu');
    if (deskTopMenu.classList.contains('hide')) {
      deskTopMenu.classList.remove('hide');
    }
  });
  const foundUser = (users, id) => users.find(u => u.id === id);
  const selectUser = (foundUser, user, match, location) => {
    const found = foundUser([...user.requests, ...user.pendings], parseInt(match.params.id, 10));
    let result;
    if (found) {
      result = found;
    } else if (user.id === parseInt(match.params.id, 10)) {
      result = user;
    } else {
      result = location.state.user;
    }
    return result;
  };
  const infoUser = selectUser(foundUser, user, match, location);
  const infoUserToHtml = (obj, courses, findCoursesCb) => {
    if (obj.status) {
      return (
        <div className={styles.friendTrue}>
          <div
            style={{
              backgroundImage: obj.url_avatar ? `url(${urlApi}${obj.url_avatar.slice(1, obj.url_avatar.length)})` : `url(${avatarImage})`,
            }}
            className={`${course.mainPic}`}
          >
            <div className={course.degrade} />
            <div className={course.infoTeacher}>
              <div>
                {obj.status}
              </div>
            </div>
            <div className={course.price}>
              <h3>{obj.username}</h3>
            </div>
          </div>
          <h3 className={styles.titleCourses}>Courses</h3>
          <div className={styles.interactions}>
            <h4>Student</h4>
            <div className={styles.courses}>
              {coursesToDivs(findCoursesCb(courses, obj.courses_as_student), url, location)}
            </div>
          </div>
          <div className={styles.interactions}>
            <h4>Teacher</h4>
            <div className={styles.courses}>
              {coursesToDivs(findCoursesCb(courses, obj.courses), url, location)}
            </div>
          </div>
          <div className={styles.comments}>
            <h4 className={course.commentsTitle}>
              {infoUser.username}
              &apos;s opinions
            </h4>
            {commentsToDivsWithCourse(obj.comments, location, url)}
          </div>
        </div>
      );
    }
    return (
      <div className={styles.friendFalse}>
        <div
          style={{
            backgroundImage: infoUser.url_avatar ? `url(${urlApi}${infoUser.url_avatar.slice(1, infoUser.url_avatar.length)})` : `url(${avatarImage})`,
          }}
          className={`${styles.avatar} avatar ${styles.avatarNotFriend}`}
        />
        <h3 className={styles.username}>{infoUser.username}</h3>
        <div className={styles.notFriends}>Your are not friends yet</div>
        <button
          className="button-3"
          type="button"
          onClick={() => {
            const isRequested = isFriendshipRequested(user.pending_requested_friendships, obj.id);
            if (isRequested) {
              handleDelFriend(
                tokenPayload,
                userPayload,
                id,
                token,
                userId,
                userPassword,
                urlApi,
                objThunk,
                {
                  id: isRequested.id,
                  pendingRequested: true,
                },
              );
            } else {
              handleCreateFriendship(
                tokenPayload,
                userPayload,
                id,
                token,
                userId,
                userPassword,
                obj.id,
                obj.username,
                objThunk,
                urlApi,
              );
            }
          }}
        >
          { isFriendshipRequested(user.pending_requested_friendships, obj.id) ? 'Cancel request' : 'Add to friend' }
        </button>
      </div>
    );
  };

  return (
    <div>
      <nav className="navMenu">
        <div>
          <Link to={location.state ? location.state.from.pathname : `${url}`}>
            <FontAwesomeIcon icon="chevron-left" />
          </Link>
        </div>
        <div>
          {infoUser.username}
        </div>
        <button className="removeButtonStyles" type="button" onClick={() => setShowMenu(true)}>
          <FontAwesomeIcon icon="ellipsis-v" />
        </button>
      </nav>
      <div className={styles.container}>
        {infoUserToHtml(infoUser, courses, findCourses)}
      </div>
    </div>
  );
};

User.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
  location: ReactRouterPropTypes.location.isRequired,
  url: PropTypes.string.isRequired,
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
    pending_requested_friendships: PropTypes.arrayOf(PropTypes.shape({
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
    })),
    pendings: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      user_id: PropTypes.number,
      course_id: PropTypes.number,
      confirmed: PropTypes.bool,
    })).isRequired,
  })).isRequired,
  coursesToDivs: PropTypes.func.isRequired,
  commentsToDivsWithCourse: PropTypes.func.isRequired,
  handleCreateFriendship: PropTypes.func.isRequired,
  tokenPayload: PropTypes.func.isRequired,
  userPayload: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  token: PropTypes.string.isRequired,
  userId: PropTypes.func.isRequired,
  userPassword: PropTypes.func.isRequired,
  objThunk: PropTypes.func.isRequired,
  urlApi: PropTypes.string.isRequired,
  isFriendshipRequested: PropTypes.func.isRequired,
  handleDelFriend: PropTypes.func.isRequired,
  findCourses: PropTypes.func.isRequired,
  setShowMenu: PropTypes.func.isRequired,
};

export default User;
