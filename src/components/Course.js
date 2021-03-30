import React from 'react';
import { Link } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '../css/Course.module.css';
import avatar from '../assets/images/avatar.jpg';

const Course = props => {
  const {
    match,
    courses,
    teacherCourses,
    location,
    url,
    usersListToDiv,
    commentsToDivs,
    useAuth,
    isPresentInUserId,
    isPresentInId,
    handleLike,
    handleSubscription,
    objThunk,
    urlApi,
    token,
    tokenPayload,
    userPayload,
    id,
    setUserErr,
    mainUrl,
    picturesToDivs,
    setShowMenu,
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
      <nav className="navMenu">
        <div>
          <Link to={location.state ? location.state.from.pathname : `${url}`}>
            &#60;
          </Link>
        </div>
        <div>
          {course.title}
        </div>
        <button className="removeButtonStyles" type="button" onClick={() => setShowMenu(true)}>
          <FontAwesomeIcon icon="ellipsis-v" />
        </button>
      </nav>
      <div>
        <div
          style={{
            backgroundImage: course.main_image_url ? `url(${urlApi}${mainUrl(course)})` : `url(${avatar})`,
          }}
          className={`${styles.mainPic}`}
        >
          <div className={styles.degrade} />
          <div className={styles.infoTeacher}>
            <Link
              to={{
                pathname: `${url}/user/${course.teacher_id}`,
                state: {
                  from: location,
                  user: course.teacher,
                },
              }}
            >
              <div
                style={{
                  backgroundImage: course.teacher.url_avatar ? `url(${urlApi}${course.teacher.url_avatar.slice(1, course.teacher.url_avatar.length)})` : `url(${avatar})`,
                }}
                className="avatar"
              />
            </Link>
            <div className={styles.teacherDetails}>
              <div>
                {` ${course.teacher.username}`}
              </div>
              <div className={styles.likes}>
                <button className="like" type="button" onClick={() => handleLike(objAuth.userId, course.id, isPresentInUserId, course.favorites)}>
                  <FontAwesomeIcon icon={
                    isPresentInUserId(course.favorites, objAuth.userId) ? 'heart' : ['far', 'heart']
                    }
                  />
                </button>
                <div>
                  {` ${course.favorites.length}`}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.price}>
            {'$ '}
            {`${course.price}`}
          </div>
        </div>
      </div>
      {course.status !== 'Closed'
      && (
        <button
          className={styles.subscribe}
          type="button"
          onClick={() => handleSubscription(
            isPresentInUserId,
            isPresentInId,
            setUserErr,
            objAuth.userId,
            objAuth.userPassword,
            course.subscriptions,
            teacherCourses,
            course.pending_students,
            course.pendings,
            objThunk,
            urlApi,
            tokenPayload,
            userPayload,
            id,
            token,
            course.id,
            course.title,
          )}
        >
          {isPresentInUserId(course.subscriptions, objAuth.userId) ? 'Unsubscribe' : ''}
          {isPresentInId(course.pending_students, objAuth.userId) ? 'Cancel' : ''}
          {!isPresentInUserId(course.subscriptions, objAuth.userId) && !isPresentInId(course.pending_students, objAuth.userId) ? 'Subscribe' : ''}
        </button>
      ) }
      <div className={styles.basicInfo}>
        <h3 className={styles.title}>{course.title}</h3>
        <div className={styles.dates}>
          Start:
          {` ${start()}`}
          <br />
          End:
          {` ${finish()}`}
        </div>
        <div className={styles.content}>{course.content}</div>
        <div className={styles.status}>
          status:
          {` ${course.status}`}
        </div>
        <a href="#images" aria-label="images" className={styles.jump1}><FontAwesomeIcon icon="chevron-down" /></a>
      </div>
      <div className={styles.public}>
        <div className={`${styles.pictures}`} id="images">
          {course.images_url.length > 0 ? picturesToDivs(course.images_url, urlApi, styles.picture) : <div className="no-images">No images</div>}
        </div>
        <div>
          <div className={styles.interactions}>
            <h4>Confirmed</h4>
            <div className={styles.students}>
              {usersListToDiv(course.confirmed_students, location, url)}
            </div>
          </div>
          <div className={styles.interactions}>
            <h4>Pendings</h4>
            <div className={styles.students}>
              {usersListToDiv(course.pending_students, location, url)}
            </div>
          </div>
        </div>
        <div className={styles.comments}>
          <h4 className={styles.commentsTitle}>Comments</h4>
          <div>{commentsToDivs(course.comments, location, url)}</div>
        </div>
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
    })),
    pendings: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      user_id: PropTypes.number,
      course_id: PropTypes.number,
      confirmed: PropTypes.bool,
    })).isRequired,
  })).isRequired,
  teacherCourses: PropTypes.arrayOf(PropTypes.shape({
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
  isPresentInUserId: PropTypes.func.isRequired,
  isPresentInId: PropTypes.func.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleSubscription: PropTypes.func.isRequired,
  objThunk: PropTypes.func.isRequired,
  urlApi: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  tokenPayload: PropTypes.func.isRequired,
  userPayload: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  setUserErr: PropTypes.func.isRequired,
  mainUrl: PropTypes.func.isRequired,
  picturesToDivs: PropTypes.func.isRequired,
  setShowMenu: PropTypes.func.isRequired,
};

export default Course;
