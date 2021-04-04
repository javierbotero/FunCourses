import React, { useState } from 'react';
import {
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Course from '../components/Course';
import User from '../components/User';
import { resetStateCourses } from '../reducers/courses';
import { resetStateUser, setUserError } from '../reducers/user';
import CoursesComponent from '../components/Courses';
import DashboardComponent from '../components/Dashboard';
import FormCourseComponent from '../components/FormCourse';
import Report from '../components/Report';
import {
  createLike,
  deleteLike,
  createSubscription,
  deleteSubscription,
  updateSubscription,
  createFriendship,
  deleteFriendship,
  updateFriendship,
} from '../actions/interactions';

const Main = props => {
  const {
    courses,
    user,
    match,
    location,
    resetCourses,
    resetUser,
    objThunk,
    userPayload,
    tokenPayload,
    id,
    token,
    urlApi,
    sendLike,
    delLike,
    commentsToDivsWithCourse,
    commentsToDivs,
    usersListToDiv,
    isPresentInUserId,
    isPresentInId,
    creSubs,
    delSubs,
    setUserErr,
    updSubs,
    creFriend,
    isFriendshipRequested,
    delFriend,
    updFriend,
    findCourses,
    findCoursesFromCoursesId,
    mainUrl,
    picturesToDivs,
    userId,
    userPassword,
  } = props;
  const { path, url } = match;
  const [showMenu, setShowMenu] = useState(false);
  const handleLike = (userId, courseId, cb, favorites) => {
    const init = {
      ...tokenPayload(id, token),
      ...userPayload(userId, userPassword),
    };
    const favorite = cb(favorites, userId);
    if (favorite) {
      const payload = objThunk(urlApi, 'DELETE', init);
      payload.id = favorite.id;
      delLike(payload);
    } else {
      const payload = objThunk(urlApi, 'POST', { ...init, course_id: courseId });
      sendLike(payload);
    }
  };
  const handleSubscription = (
    isPresentInUserIdCb,
    isPresentInIdCb,
    setUserErrCb,
    uId,
    password,
    arrSubs,
    arrTeacherCourses,
    arrCoursePendingStudents,
    arrCoursePendings,
    objThunkCb,
    urlapi,
    tokenPayloadCb,
    userPayloadCb,
    appId,
    token,
    courseId,
    courseTitle,
  ) => {
    const subscription = isPresentInUserIdCb(arrSubs, uId);
    if (isPresentInIdCb(arrTeacherCourses, courseId)) {
      setUserErrCb('Trying to be a student in your course looks not good :D');
      return;
    }
    const init = {
      ...tokenPayloadCb(appId, token),
      ...userPayloadCb(uId, password),
    };
    if (!subscription && !isPresentInIdCb(arrCoursePendingStudents, uId)) {
      init.course_id = courseId;
      const payload = objThunkCb(urlapi, 'POST', init);
      payload.course = { id: courseId, title: courseTitle };
      payload.student = { id: uId, username: user.username };
      creSubs(payload);
    } else {
      const payload = objThunkCb(urlapi, 'DELETE', init);
      payload.course = { id: courseId, userId: uId };
      payload.id = subscription ? subscription.id : isPresentInUserId(arrCoursePendings, uId).id;
      delSubs(payload);
    }
  };
  const handleUpdateSubscription = (
    student,
    pendingId,
    objThunkCb,
    tokenPayloadCb,
    userPayloadCb,
    urlapi,
    appId,
    token,
    uId,
    password,
  ) => {
    const init = {
      ...tokenPayloadCb(appId, token),
      ...userPayloadCb(uId, password),
    };
    const payload = objThunkCb(urlapi, 'PUT', init);
    payload.student = student;
    payload.id = pendingId;
    updSubs(payload);
  };
  const handleDeleteSubscription = (
    appId,
    token,
    urlapi,
    objThunkCb,
    uId,
    password,
    courseId,
    studentId,
    pendArrSubs,
    tokenPayloadCb,
    userPayloadCb,
    isPresentInUserIdCb,
  ) => {
    const init = {
      ...tokenPayloadCb(appId, token),
      ...userPayloadCb(uId, password),
    };
    const pendSubs = isPresentInUserIdCb(pendArrSubs, studentId);
    if (pendSubs) {
      const payload = objThunkCb(urlapi, 'DELETE', init);
      payload.course = { id: courseId, userId: uId };
      payload.id = pendSubs.id;
      payload.studentId = studentId;
      delSubs(payload);
    }
  };
  const handleCreateFriendship = (
    tokenPayloadCb,
    userPayloadCb,
    id,
    token,
    uId,
    password,
    receiverId,
    usernameReceiver,
    objThunkCb,
    urlapi,
  ) => {
    const init = {
      ...tokenPayloadCb(id, token),
      ...userPayloadCb(uId, password),
    };
    init.receiver_id = receiverId;
    const payload = objThunkCb(urlapi, 'POST', init);
    payload.student = {
      id: receiverId,
      username: usernameReceiver,
    };
    creFriend(payload);
  };
  const handleDelFriend = (
    tokenPayloadCb,
    userPayloadCb,
    id,
    token,
    uId,
    password,
    urlapi,
    objThunkCb,
    friendship,
  ) => {
    const init = {
      ...tokenPayloadCb(id, token),
      ...userPayloadCb(uId, password),
    };
    const payload = objThunkCb(urlapi, 'DELETE', init);
    payload.friendship = friendship;
    delFriend(payload);
  };
  const handleUpdFriend = (
    tokenPayloadCb,
    userPayloadCb,
    id,
    token,
    uId,
    password,
    urlapi,
    objThunkCb,
    friendship,
  ) => {
    const init = {
      ...tokenPayloadCb(id, token),
      ...userPayloadCb(uId, password),
    };
    const payload = objThunkCb(urlapi, 'PUT', init);
    payload.friendship = friendship;
    updFriend(payload);
  };
  const coursesToDivs = (courses, url, location, access = false) => {
    if (courses.length > 0) {
      return courses.map(course => (
        <div key={course.id} className="course-container">
          <div
            className="course"
            style={{
              backgroundImage: `url(${mainUrl(course)})`,
            }}
          />
          <div className="info-section">
            <div className="info-course">
              <div className="linkCourse">
                <div>{course.title}</div>
                <Link to={{
                  pathname: `${url}/course/${course.id}`,
                  state: { from: location },
                }}
                >
                  <div className="button-4">
                    More Info
                  </div>
                </Link>
              </div>
              <div className="likes">
                <button type="button" className="like" onClick={() => handleLike(userId, course.id, isPresentInUserId, course.favorites)}>
                  <FontAwesomeIcon icon={
                    isPresentInUserId(course.favorites, userId) ? 'heart' : ['far', 'heart']
                    }
                  />
                </button>
                <div className="numberLikes">{` ${course.favorites.length}`}</div>
              </div>
            </div>
            {
              access && (
                <div>
                  <a className="button-2" href={`${course.link}`}>Join Class</a>
                </div>
              )
            }
          </div>
        </div>
      ));
    }
    return (
      <div className="no-courses">
        {'No courses yet, if you want create one '}
        <Link to={{
          pathname: `${url}/create`,
        }}
        >
          <span className="here">here</span>
        </Link>
        !
      </div>
    );
  };

  return (
    <div>
      <div className={showMenu ? 'menuMobile' : 'hide-menu'}>
        <button type="button" onClick={() => setShowMenu(false)}>x</button>
        <ul className="ulMenuMobile">
          <li role="menuitem" onKeyPress={() => setShowMenu(false)} onClick={() => setShowMenu(false)}>
            <Link
              to={{
                pathname: path,
                state: { from: location },
              }}
            >
              Courses
            </Link>
          </li>
          <li role="menuitem" onKeyPress={() => setShowMenu(false)} onClick={() => setShowMenu(false)}>
            <Link
              to={{
                pathname: `${path}/dashboard`,
                state: { from: location },
              }}
            >
              Dashboard
            </Link>
          </li>
          <li role="menuitem" onKeyPress={() => setShowMenu(false)} onClick={() => setShowMenu(false)}>
            <Link
              to={{
                pathname: `${path}/create`,
                state: { from: location },
              }}
            >
              Create
            </Link>
          </li>
          <li role="menuitem" onKeyPress={() => setShowMenu(false)} onClick={() => setShowMenu(false)}>
            <Link
              to={{
                pathname: `${path}/report`,
                state: { from: location },
              }}
            >
              Report
            </Link>
          </li>
        </ul>
      </div>
      <ul className="desktopMenu hide">
        <li role="menuitem" onKeyPress={() => setShowMenu(false)} onClick={() => setShowMenu(false)}>
          <Link
            to={{
              pathname: path,
              state: { from: location },
            }}
          >
            Courses
          </Link>
        </li>
        <li role="menuitem" onKeyPress={() => setShowMenu(false)} onClick={() => setShowMenu(false)}>
          <Link
            to={{
              pathname: `${path}/dashboard`,
              state: { from: location },
            }}
          >
            Dashboard
          </Link>
        </li>
        <li role="menuitem" onKeyPress={() => setShowMenu(false)} onClick={() => setShowMenu(false)}>
          <Link
            to={{
              pathname: `${path}/create`,
              state: { from: location },
            }}
          >
            Create
          </Link>
        </li>
        <li role="menuitem" onKeyPress={() => setShowMenu(false)} onClick={() => setShowMenu(false)}>
          <Link
            to={{
              pathname: `${path}/report`,
              state: { from: location },
            }}
          >
            Report
          </Link>
        </li>
      </ul>
      <Switch>
        <Route exact path={`${path}`}>
          <CoursesComponent
            coursesToDivs={coursesToDivs}
            avatar={user.url_avatar}
            username={user.username}
            courses={courses}
            url={url}
            urlApi={urlApi}
            location={location}
            resetUser={resetUser}
            resetCourses={resetCourses}
            isPresentInUserId={isPresentInUserId}
            setShowMenu={setShowMenu}
          />
        </Route>
        <Route
          exact
          path={`${path}/course/:id`}
          render={({ match, location }) => (
            <Course
              match={match}
              courses={courses}
              teacherCourses={user.courses}
              location={location}
              url={url}
              usersListToDiv={usersListToDiv}
              commentsToDivs={commentsToDivs}
              isPresentInUserId={isPresentInUserId}
              isPresentInId={isPresentInId}
              setUserErr={setUserErr}
              handleLike={handleLike}
              handleSubscription={handleSubscription}
              objThunk={objThunk}
              urlApi={urlApi}
              token={token}
              tokenPayload={tokenPayload}
              userPayload={userPayload}
              id={id}
              mainUrl={mainUrl}
              picturesToDivs={picturesToDivs}
              setShowMenu={setShowMenu}
              userId={userId}
              userPassword={userPassword}
            />
          )}
        />
        <Route
          exact
          path={`${path}/user/:id`}
          render={({ match, location }) => (
            <User
              courses={courses}
              match={match}
              location={location}
              url={url}
              user={user}
              coursesToDivs={coursesToDivs}
              commentsToDivsWithCourse={commentsToDivsWithCourse}
              handleCreateFriendship={handleCreateFriendship}
              tokenPayload={tokenPayload}
              userPayload={userPayload}
              id={id}
              token={token}
              objThunk={objThunk}
              urlApi={urlApi}
              isFriendshipRequested={isFriendshipRequested}
              handleDelFriend={handleDelFriend}
              findCourses={findCourses}
              setShowMenu={setShowMenu}
              userId={userId}
              userPassword={userPassword}
            />
          )}
        />
        <Route
          exact
          path={`${path}/dashboard`}
          render={({ location }) => (
            <DashboardComponent
              courses={courses}
              user={user}
              location={location}
              url={url}
              coursesToDivs={coursesToDivs}
              usersListToDiv={usersListToDiv}
              handleUpdateSubscription={handleUpdateSubscription}
              handleDeleteSubscription={handleDeleteSubscription}
              objThunk={objThunk}
              tokenPayload={tokenPayload}
              userPayload={userPayload}
              urlApi={urlApi}
              id={id}
              token={token}
              teacherCourses={user.courses}
              commentsToDivs={commentsToDivs}
              isPresentInUserId={isPresentInUserId}
              isPresentInId={isPresentInId}
              setUserErr={setUserErr}
              handleDelFriend={handleDelFriend}
              handleUpdFriend={handleUpdFriend}
              findCoursesFromCoursesId={findCoursesFromCoursesId}
              findCourses={findCourses}
              mainUrl={mainUrl}
              setShowMenu={setShowMenu}
              userId={userId}
              userPassword={userPassword}
            />
          )}
        />
        <Route
          exact
          path={`${path}/create`}
          render={({ location }) => (
            <FormCourseComponent
              location={location}
              userId={userId}
              userPassword={userPassword}
              id={id}
              token={token}
              username={user.username}
              urlApi={urlApi}
              objThunk={objThunk}
              userPayload={userPayload}
              tokenPayload={tokenPayload}
              url={url}
              setShowMenu={setShowMenu}
            />
          )}
        />
        <Route
          exact
          path={`${url}/report`}
          render={({ location }) => (
            <Report
              location={location}
              url={url}
              user={user}
              findCourses={findCourses}
              courses={courses}
              setShowMenu={setShowMenu}
            />
          )}
        />
      </Switch>
    </div>
  );
};

Main.propTypes = {
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
  resetUser: PropTypes.func.isRequired,
  resetCourses: PropTypes.func.isRequired,
  objThunk: PropTypes.func.isRequired,
  userPayload: PropTypes.func.isRequired,
  tokenPayload: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  urlApi: PropTypes.string.isRequired,
  sendLike: PropTypes.func.isRequired,
  delLike: PropTypes.func.isRequired,
  commentsToDivsWithCourse: PropTypes.func.isRequired,
  commentsToDivs: PropTypes.func.isRequired,
  usersListToDiv: PropTypes.func.isRequired,
  isPresentInUserId: PropTypes.func.isRequired,
  isPresentInId: PropTypes.func.isRequired,
  creSubs: PropTypes.func.isRequired,
  delSubs: PropTypes.func.isRequired,
  setUserErr: PropTypes.func.isRequired,
  updSubs: PropTypes.func.isRequired,
  creFriend: PropTypes.func.isRequired,
  isFriendshipRequested: PropTypes.func.isRequired,
  delFriend: PropTypes.func.isRequired,
  updFriend: PropTypes.func.isRequired,
  findCourses: PropTypes.func.isRequired,
  findCoursesFromCoursesId: PropTypes.func.isRequired,
  mainUrl: PropTypes.func.isRequired,
  picturesToDivs: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
  userPassword: PropTypes.string.isRequired,
};

const mapDispatchToProps = dispatch => ({
  setUserErr: payload => dispatch(setUserError(payload)),
  resetCourses: () => dispatch(resetStateCourses()),
  resetUser: () => dispatch(resetStateUser()),
  sendLike: payload => dispatch(createLike(payload)),
  delLike: payload => dispatch(deleteLike(payload)),
  creSubs: payload => dispatch(createSubscription(payload)),
  delSubs: payload => dispatch(deleteSubscription(payload)),
  updSubs: payload => dispatch(updateSubscription(payload)),
  creFriend: payload => dispatch(createFriendship(payload)),
  delFriend: payload => dispatch(deleteFriendship(payload)),
  updFriend: payload => dispatch(updateFriendship(payload)),
});

export default connect(null, mapDispatchToProps)(Main);
