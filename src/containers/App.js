import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Course from '../components/Course';
import Login from '../components/Login';

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
    initCreator,
  } = props;
  const [currentUserId, setCurrentUserId] = useState(localStorage.getItem('currentUserIdFunCourses'));
  const [currentUserPassword, setCurrentUserPassword] = useState(localStorage.getItem('currentUserPasswordFunCourses'));
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
    if (currentUserId && currentUserPassword) {
      if (statusCourses === 'idle') {
        dispatch(getCourses(dataThunkCourses));
      }
      if (statusUser === 'idle') {
        dispatch(getUser(dataThunkUser));
      }
    }
  }, [statusCourses, getCourses, getUser, dispatch, dataThunkCourses, dataThunkUser, statusUser]);
  const coursesToDivs = courses => courses.map(course => (
    <div key={course.id}>
      <div>Some picture</div>
      <div>{course.title}</div>
      <div>
        <Link to={`course/${course.id}`}>More Info</Link>
      </div>
    </div>
  ));
  const handleApiRequest = async (initCreator, verb, url, data) => {
    const init = initCreator({ verb, data });
    const response = await fetch(url, init)
      .then(res => res.json().then(data => data))
      .catch(err => err.json().then(err => err));
    return response;
  };

  if (currentUserId && currentUserPassword) {
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
              path="course/:id"
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
  }
  return (
    <Login
      tokenPayload={tokenPayload}
      id={id}
      token={token}
      url={url}
      initCreator={initCreator}
      handleApiRequest={handleApiRequest}
      setCurrentUserId={setCurrentUserId}
      setCurrentUserPassword={setCurrentUserPassword}
    />
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
  initCreator: PropTypes.func.isRequired,
};

export default App;
