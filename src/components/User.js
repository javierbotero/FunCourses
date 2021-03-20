import React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

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
    useAuth,
    urlApi,
    objThunk,
    isFriendshipRequested,
    handleDelFriend,
    findCourses,
  } = props;
  const objAuth = useAuth();
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
        <div>
          <div>
            {obj.status}
          </div>
          <h3>
            {obj.username}
            {' Courses'}
          </h3>
          <div className="student">
            <h4>Courses as Student</h4>
            {coursesToDivs(findCoursesCb(courses, obj.courses_as_student))}
          </div>
          <div className="teacher">
            <h4>Courses as Teacher</h4>
            {coursesToDivs(findCoursesCb(courses, obj.courses))}
          </div>
          <div>
            <h4>
              Comments made by
              {` ${obj.username}`}
            </h4>
            {commentsToDivsWithCourse(obj.comments, location, url)}
          </div>
        </div>
      );
    }
    return (
      <div>
        <div>Your are not friends yet</div>
        <button
          type="button"
          onClick={() => {
            const isRequested = isFriendshipRequested(user.pending_requested_friendships, obj.id);
            if (isRequested) {
              handleDelFriend(
                tokenPayload,
                userPayload,
                id,
                token,
                objAuth.userId,
                objAuth.userPassword,
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
                objAuth.userId,
                objAuth.userPassword,
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
      <nav>
        <ul>
          <li>
            <Link to={location.state ? location.state.from.pathname : `${url}`}>
              &#60;
            </Link>
          </li>
        </ul>
      </nav>
      <h3>{infoUser.username}</h3>
      {infoUserToHtml(infoUser, courses, findCourses)}
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
      })).isRequired,
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
  coursesToDivs: PropTypes.func.isRequired,
  commentsToDivsWithCourse: PropTypes.func.isRequired,
  handleCreateFriendship: PropTypes.func.isRequired,
  tokenPayload: PropTypes.func.isRequired,
  userPayload: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  token: PropTypes.string.isRequired,
  useAuth: PropTypes.func.isRequired,
  objThunk: PropTypes.func.isRequired,
  urlApi: PropTypes.string.isRequired,
  isFriendshipRequested: PropTypes.func.isRequired,
  handleDelFriend: PropTypes.func.isRequired,
  findCourses: PropTypes.func.isRequired,
};

export default User;
