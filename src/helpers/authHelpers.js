import {
  useState,
  useContext,
  createContext,
} from 'react';
import store from '../store/store';
import { setUserError, removeUserError } from '../reducers/user';

const authContext = createContext();

const useAuth = () => useContext(authContext);

const useAuthState = () => {
  const [userId, setUserId] = useState(localStorage.getItem('currentUserIdFunCourses'));
  const [userPassword, setUserPassword] = useState(localStorage.getItem('currentUserPasswordFunCourses'));
  const authenticate = (
    handleApiRequest,
    initCreator,
    verb,
    url,
    data,
  ) => {
    handleApiRequest(initCreator, verb, url, data)
      .then(resp => resp.json().then(res => {
        console.log(res);
        if (res.username) {
          localStorage.setItem('currentUserIdFunCourses', res.id);
          localStorage.setItem('currentUserPasswordFunCourses', data.password);
          setUserId(res.id);
          setUserPassword(data.password);
          store.dispatch(removeUserError());
        } else if (Array.isArray(res)) {
          store.dispatch(setUserError(res.join(' ')));
        } else if (res.TypeError) {
          store.dispatch(setUserError(res.TypeError));
        } else {
          store.dispatch(setUserError(res));
        }
        return res;
      }))
      .catch(err => {
        store.dispatch(setUserError(err));
      });
  };
  return {
    userId,
    userPassword,
    authenticate,
  };
};

export {
  authContext,
  useAuthState,
  useAuth,
};
