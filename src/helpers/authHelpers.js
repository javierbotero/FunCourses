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
      .then(resp => (
        resp.json().then(res => {
          if (res.user) {
            localStorage.setItem('currentUserIdFunCourses', res.user.id);
            localStorage.setItem(
              'currentUserPasswordFunCourses',
              'user' in data ? data.user.password : data.password,
            );
            setUserId(res.user.id);
            setUserPassword('user' in data ? data.user.password : data.password);
            store.dispatch(removeUserError());
          } else if (res.error) {
            store.dispatch(setUserError(res.error));
          } else {
            store.dispatch(setUserError('Something went wrong, try later'));
          }
          return res;
        })
      ))
      .catch(err => {
        store.dispatch(setUserError(`Something went wrong. ${err}`));
      });
  };
  return {
    userId,
    userPassword,
    authenticate,
    setUserId,
    setUserPassword,
  };
};

export {
  authContext,
  useAuthState,
  useAuth,
};
