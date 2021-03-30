import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CoursesCss from '../css/Courses.module.css';
import avatarImage from '../assets/images/avatar.jpg';

const Courses = props => {
  const {
    courses,
    coursesToDivs,
    location,
    url,
    useAuth,
    resetUser,
    resetCourses,
    avatar,
    username,
    urlApi,
    setShowMenu,
  } = props;
  const popUpMenu = () => {
    const div = document.getElementsByClassName('scrollContainer')[0];
    const navMenu = () => document.querySelector('.navMenu');
    if (div.scrollLeft < 200) {
      navMenu().classList.add('hide');
      navMenu().classList.remove('show');
    } else {
      navMenu().classList.remove('hide');
      navMenu().classList.add('show');
    }
  };
  useEffect(() => {
    const div = document.getElementsByClassName('scrollContainer')[0];
    div.addEventListener('scroll', popUpMenu);
    return () => {
      div.removeEventListener('scroll', popUpMenu);
    };
  }, []);
  const authObject = useAuth();
  const logout = () => {
    localStorage.removeItem('currentUserIdFunCourses');
    localStorage.removeItem('currentUserPasswordFunCourses');
    authObject.setUserId(null);
    authObject.setUserPassword(null);
    resetUser();
    resetCourses();
  };

  return (
    <div
      className={`${CoursesCss.courses} scrollContainer`}
    >
      <nav className="navMenu hide">
        <button className="removeButtonStyles" type="button" onClick={() => setShowMenu(true)}>
          <FontAwesomeIcon icon="bars" />
        </button>
      </nav>
      <header className={`${CoursesCss.coursesMenu}`}>
        <div className={`${CoursesCss.avatarZone}`}>
          <div
            className={`avatar ${CoursesCss.avatarPic}`}
            style={{
              backgroundImage: avatar ? `url(${urlApi}${avatar.slice(1, avatar.length)})` : `url(${avatarImage})`,
            }}
          />
          <h4 className={CoursesCss.username}>{username}</h4>
        </div>
        <ul className={`${CoursesCss.menu}`}>
          <li>
            <Link to={{
              pathname: `${url}/dashboard`,
              state: { from: location },
            }}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link to={{
              pathname: `${url}/create`,
              state: { from: location },
            }}
            >
              Create
            </Link>
          </li>
          <li>
            <Link to={{
              pathname: `${url}/report`,
              state: { from: location },
            }}
            >
              Report
            </Link>
          </li>
        </ul>
        <button className={`${CoursesCss.btn}`} type="button" onClick={logout}>Log out</button>
      </header>
      <div className={`${CoursesCss.coursesItems}`}>
        {coursesToDivs(courses, url, location)}
      </div>
    </div>
  );
};

Courses.propTypes = {
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
  useAuth: PropTypes.func.isRequired,
  resetUser: PropTypes.func.isRequired,
  resetCourses: PropTypes.func.isRequired,
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  urlApi: PropTypes.string.isRequired,
  setShowMenu: PropTypes.func.isRequired,
};

export default Courses;
