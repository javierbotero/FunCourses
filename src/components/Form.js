import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactRouterPropTypes from 'react-router-prop-types';
import { setUserError, removeUserError } from '../reducers/user';

const Form = props => {
  const {
    initCreator,
    tokenPayload,
    id,
    token,
    url,
    handleApiRequest,
    setCurrentUserId,
    setCurrentUserPassword,
    match,
  } = props;
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [passConf, setPassConf] = useState('');
  const [email, setEmail] = useState('');
  const handleSubmit = async e => {
    e.preventDefault();
    if (password.length < 5 || userName.length < 5 || email.length < 5 || password !== passConf) {
      setUserError('Please fill the form correctly');
      return;
    }
    const tokenInfo = tokenPayload(id, token);
    const data = {
      ...tokenInfo,
      username: userName,
      password,
      password_confirmation: passConf,
      email,
    };
    const result = await handleApiRequest(
      initCreator,
      'POST',
      `${url}${match.params.identifier ? 'signup' : 'login'}`,
      data,
    ).then(res => {
      console.log(res);
      return res;
    }).catch(err => {
      console.log(err);
      return err;
    });
    console.log(result);
    if (result.username) {
      localStorage.setItem('currentUserIdFunCourses', result.id);
      localStorage.setItem('currentUserPasswordFunCourses', password);
      setCurrentUserId(result.id);
      setCurrentUserPassword(password);
    }
  };
  const signUpFormHtml = (
    <div className="form signup">
      <div className="auth-title">Sign Up</div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">
            <div>Username</div>
            <input type="text" onChange={e => setUserName(e.target.value)} value={userName} id="username" placeholder="Juan" />
          </label>
        </div>
        <div>
          <label htmlFor="email">
            <div>Email</div>
            <input type="email" onChange={e => setEmail(e.target.value)} value={email} id="email" placeholder="juan@mail.com" />
          </label>
        </div>
        <div>
          <label htmlFor="password">
            <div>password</div>
            <input type="password" onChange={e => setPassword(e.target.value)} value={password} id="password" placeholder="password" />
          </label>
        </div>
        <div>
          <label htmlFor="passwordConfirmation">
            <div>Password confirmation</div>
            <input type="password" onChange={e => setPassConf(e.target.value)} value={passConf} id="passwordConfirmation" placeholder="confirmation" />
          </label>
        </div>
        <div>
          <input type="submit" value="Submit" className="btn" />
        </div>
      </form>
    </div>
  );

  const logInFormHtml = (
    <div className="form login">
      <div className="auth-title">Log in</div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">
            <div>Username</div>
            <input type="text" onChange={e => setUserName(e.target.value)} value={userName} id="username" placeholder="Juan" />
          </label>
        </div>
        <div>
          <label htmlFor="password">
            <div>password</div>
            <input type="password" onChange={e => setPassword(e.target.value)} value={password} id="password" placeholder="password" />
          </label>
        </div>
        <div>
          <input type="submit" value="Submit" className="btn" />
        </div>
      </form>
    </div>
  );

  console.log(match.params);

  if (match.params.identifier === 'signup') {
    return signUpFormHtml;
  }
  return logInFormHtml;
};

Form.propTypes = {
  initCreator: PropTypes.func.isRequired,
  tokenPayload: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  handleApiRequest: PropTypes.func.isRequired,
  setCurrentUserId: PropTypes.func.isRequired,
  setCurrentUserPassword: PropTypes.func.isRequired,
  match: ReactRouterPropTypes.match.isRequired,
};

const mapDispatchToProps = dispatch => ({
  setUserError: err => dispatch(setUserError(err)),
  removeUserError: () => dispatch(removeUserError),
});

export default connect(null, mapDispatchToProps)(Form);
