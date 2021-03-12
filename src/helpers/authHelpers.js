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
      .then(resp => {
        console.log(resp);
        return resp.json().then(res => {
          console.log(res);
          if (res.user) {
            localStorage.setItem('currentUserIdFunCourses', res.id);
            localStorage.setItem('currentUserPasswordFunCourses', data.password);
            setUserId(res.user.id);
            setUserPassword(data.password);
            store.dispatch(removeUserError());
          } else if (res.error) {
            store.dispatch(setUserError(res.error));
          } else {
            store.dispatch(setUserError('Smething went wrong, try later'));
          }
          return res;
        });
      })
      .catch(err => {
        store.dispatch(setUserError(`Something went wrong. ${err}`));
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
