import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Course from '../components/Course';

const App = props => {
  const {
    getCourses,
    getUser,
    objThunk,
    url,
    token,
    id,
    tokenPayload,
    userPayload,
  } = props;
  const currentUserId = 1;
  const currentUserPassword = '12345';
  const dispatch = useDispatch();
  const courses = useSelector(state => state.courses.courses);
  const statusUser = useSelector(state => state.user.status);
  const statusCourses = useSelector(state => state.courses.status);
  const tokenData = tokenPayload(id, token);
  const userData = userPayload(currentUserId, currentUserPassword);
  const dataThunkCourses = objThunk(
    url,
    'POST',
    {
      ...tokenData,
    },
  );
  const dataThunkUser = objThunk(
    url,
    'POST',
    {
      ...tokenData,
      ...userData,
    },
  );
  useEffect(() => {
    if (statusCourses === 'idle') {
      dispatch(getCourses(dataThunkCourses));
    }
    if (statusUser === 'idle') {
      dispatch(getUser(dataThunkUser));
    }
  }, [statusCourses, getCourses, getUser, dispatch, dataThunkCourses, dataThunkUser, statusUser]);
  const coursesToDivs = courses => courses.map(course => (
    <div key={course.id}>
      <div>Some picture</div>
      <div>{course.title}</div>
      <div>
        <Link to={`/${course.id}`}>More Info</Link>
      </div>
    </div>
  ));
  return (
    <div>
      <BrowserRouter>
        <header>
          <h1>Find a fun course!</h1>
        </header>
        <Switch>
          <Route exact path="/">
            {coursesToDivs(courses)}
          </Route>
          <Route
            exact
            path="/:id"
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
      </BrowserRouter>
    </div>
  );
};

App.propTypes = {
  getCourses: PropTypes.func.isRequired,
  getUser: PropTypes.func.isRequired,
  objThunk: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  tokenPayload: PropTypes.func.isRequired,
  userPayload: PropTypes.func.isRequired,
};

export default App;
