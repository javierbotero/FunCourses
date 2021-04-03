import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactRouterPropTypes from 'react-router-prop-types';
import {
  setUserError,
  removeUserError,
  setTrueLoading,
  setFalseLoading,
} from '../reducers/user';
import formCss from '../css/Form.module.css';
import fun1 from '../assets/images/fun1.jpeg';
import fun2 from '../assets/images/fun2.jpg';

const Form = props => {
  const {
    initCreator,
    tokenPayload,
    id,
    token,
    url,
    handleApiRequest,
    match,
    setUserErr,
    removeUserErr,
    setTrueLoad,
    setFalseLoad,
    history,
    authenticate,
  } = props;
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [passConf, setPassConf] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');
  const [matcher, setMatcher] = useState(match.params.identifier);
  const handleSubmit = async e => {
    e.preventDefault();
    setTrueLoad();
    if (matcher === 'signup') {
      if (password.length < 5 || userName.length < 5 || email.length < 5 || password !== passConf) {
        setUserErr('Please fill the form correctly, Username and password should be more than 4 characters, password and confirmation must be equal');
        return;
      }
    } else if (password.length < 5 || userName.length < 5) {
      setUserErr('Please fill the form correctly, Username and password should be more than 4 characters');
      return;
    }
    const tokenInfo = tokenPayload(id, token);
    const dataSignUp = {
      ...tokenInfo,
      avatar,
      user: {
        username: userName,
        password,
        password_confirmation: passConf,
        email,
      },
    };
    const dataLogIn = {
      ...tokenInfo,
      username: userName,
      password,
    };
    authenticate(
      handleApiRequest,
      initCreator,
      'POST',
      `${url}${matcher === 'signup' ? 'signup' : 'login'}`,
      matcher === 'signup' ? dataSignUp : dataLogIn,
      setFalseLoad,
    );
    setUserName('');
    setEmail('');
    setPassword('');
    setPassConf('');
  };
  const handleChange = (e, cb, attach = false) => {
    removeUserErr();
    if (attach && e.target.files[0]) {
      const pictureData = new FileReader();
      pictureData.onloadstart = () => setTrueLoad();
      pictureData.onloadend = () => setFalseLoad();
      pictureData.readAsDataURL(e.target.files[0]);
      pictureData.onload = () => {
        cb(
          {
            io: pictureData.result.split(',')[1],
            filename: e.target.files[0].name,
          },
        );
      };
      pictureData.onerror = () => {
        setUserErr('File could not be loaded');
      };
    } else {
      cb(e.target.value);
    }
  };
  const changeHistory = str => {
    setMatcher(str);
    history.push(`/${str}`);
  };

  const infoSign = (signup = false) => {
    if (signup) {
      return (
        <div>
          {'Hello there! join our community and start '}
          {'enjoying fun courses. If you have an account please '}
          <button className="button-3" type="button" onClick={() => changeHistory('login')}>Log in</button>
        </div>
      );
    }
    return (
      <div>
        {'Hello there! it\'s time to learn with fun courses. '}
        {"If you don't have an account please "}
        <button className="button-3" type="button" onClick={() => changeHistory('signup')}>Sign up</button>
      </div>
    );
  };

  return (
    <div
      className="form positionImage"
      style={{ backgroundImage: matcher === 'signup' ? `url(${fun1})` : `url(${fun2})` }}
    >
      <div className={`${formCss.layer} ${matcher === 'signup' ? formCss.signup : formCss.login}`} />
      <h3 className={`${formCss.index2} form-item`}>{matcher === 'signup' ? 'Sign Up' : 'Log in'}</h3>
      <div className={`form-item ${formCss.index2}`}>{matcher === 'signup' ? infoSign(true) : infoSign()}</div>
      <form className={`form-item ${formCss.index2}`} onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">
            <div>Username</div>
            <input type="text" onChange={e => handleChange(e, setUserName)} value={userName} id="username" placeholder="User" />
          </label>
        </div>
        {matcher === 'signup'
          && (
            <div>
              <label htmlFor="email">
                <div>Email</div>
                <input type="email" onChange={e => handleChange(e, setEmail)} value={email} id="email" placeholder="user@mail.com" />
              </label>
            </div>
          )}
        <div>
          <label htmlFor="password">
            <div>Password</div>
            <input type="password" onChange={e => handleChange(e, setPassword)} value={password} id="password" placeholder="password" />
          </label>
        </div>
        { matcher === 'signup' && (
          <div>
            <label htmlFor="passwordConfirmation">
              <div>Password confirmation</div>
              <input type="password" onChange={e => handleChange(e, setPassConf)} value={passConf} id="passwordConfirmation" placeholder="confirmation" />
            </label>
          </div>
        )}
        { matcher === 'signup' && (
          <div>
            <label htmlFor="avatar">
              <div>Image Profile</div>
              <input type="file" alt="avatar" onChange={e => handleChange(e, setAvatar, true)} id="avatar" name="avatar" accept="image/*" />
            </label>
          </div>
        )}
        <div className={`${formCss.buttonSubmit}`}>
          <input type="submit" value="Submit" className="btn button-2" />
        </div>
      </form>
    </div>
  );
};

Form.propTypes = {
  initCreator: PropTypes.func.isRequired,
  tokenPayload: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  handleApiRequest: PropTypes.func.isRequired,
  match: ReactRouterPropTypes.match.isRequired,
  setUserErr: PropTypes.func.isRequired,
  removeUserErr: PropTypes.func.isRequired,
  setTrueLoad: PropTypes.func.isRequired,
  setFalseLoad: PropTypes.func.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
  authenticate: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  setUserErr: err => dispatch(setUserError(err)),
  removeUserErr: () => dispatch(removeUserError()),
  setTrueLoad: () => dispatch(setTrueLoading()),
  setFalseLoad: () => dispatch(setFalseLoading()),
});

export default connect(null, mapDispatchToProps)(Form);
export { Form };
