import store from '../store/store';
import {
  setUserError,
  removeUserError,
  setUserPassword,
  setUser,
} from '../reducers/user';

const authenticate = (
  handleApiRequest,
  initCreator,
  verb,
  url,
  data,
  setFalseLoadCb,
) => {
  handleApiRequest(initCreator, verb, url, data)
    .then(resp => (
      resp.json().then(res => {
        setFalseLoadCb();
        if (res.user) {
          localStorage.setItem('currentUserIdFunCourses', res.user.id);
          localStorage.setItem(
            'currentUserPasswordFunCourses',
            'user' in data ? data.user.password : data.password,
          );
          store.dispatch(setUser(res));
          store.dispatch(setUserPassword('user' in data ? data.user.password : data.password));
          store.dispatch(removeUserError());
        } else if (res.error) {
          store.dispatch(setUserError(res.error));
        } else {
          store.dispatch(setUserError('Something went wrong, try later'));
        }
        return res;
      })
        .catch(err => err)
    ))
    .catch(err => {
      store.dispatch(setUserError(`Something went wrong. ${err}`));
    });
};

export default authenticate;
