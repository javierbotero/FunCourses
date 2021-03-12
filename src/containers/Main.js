import React from 'react';
import {
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import Course from '../components/Course';

const Main = props => {
  const {
    courses,
    match,
  } = props;
  const { path, url } = match;
  const coursesToDivs = courses => courses.map(course => (
    <div key={course.id}>
      <div>Some picture</div>
      <div>{course.title}</div>
      <div>
        <Link to={`${url}/course/${course.id}`}>More Info</Link>
      </div>
    </div>
  ));

  return (
    <div>
      <header>
        <ul>
          <li>
            <Link to={`${url}`}>Courses</Link>
          </li>
          FIND A FUN COURSE
        </ul>
      </header>
      <Switch>
        <Route exact path={`${path}`}>
          {coursesToDivs(courses)}
        </Route>
        <Route
          exact
          path={`${path}/course/:id`}
          render={({ match }) => (
            <div>
              <nav>
                <ul>
                  <li>
                    <Link to="/">&#60;</Link>
                  </li>
                </ul>
              </nav>
              <Course match={match} courses={courses} />
            </div>
          )}
        />
      </Switch>
    </div>
  );
};

Main.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
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
};

export default Main;
