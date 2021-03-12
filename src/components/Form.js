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
    match,
    setUserErr,
    useAuth,
    removeUserErr,
  } = props;
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [passConf, setPassConf] = useState('');
  const [email, setEmail] = useState('');
  const authObject = useAuth();
  const handleSubmit = async e => {
    e.preventDefault();
    if (match.params.identifier === 'signup') {
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
    authObject.authenticate(
      handleApiRequest,
      initCreator,
      'POST',
      `${url}${match.params.identifier === 'signup' ? 'signup' : 'login'}`,
      match.params.identifier === 'signup' ? dataSignUp : dataLogIn,
    );
  };
  const handleChange = (e, cb) => {
    removeUserErr();
    cb(e.target.value);
  };

  return (
    <div className={`form ${match.params.identifier === 'signup' ? 'signup' : 'login'}`}>
      <div className="auth-title">{match.params.identifier === 'signup' ? 'Sign Up' : 'Log in'}</div>
      <p>{match.params.identifier === 'signup' ? 'Hello there! join our community and start enjoying fun courses' : 'Hello there! it\'s time to learn with fun courses'}</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">
            <div>Username</div>
            <input type="text" onChange={e => handleChange(e, setUserName)} value={userName} id="username" placeholder="User" />
          </label>
        </div>
        {match.params.identifier === 'signup'
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
            <div>password</div>
            <input type="password" onChange={e => handleChange(e, setPassword)} value={password} id="password" placeholder="password" />
          </label>
        </div>
        { match.params.identifier === 'signup' && (
          <div>
            <label htmlFor="passwordConfirmation">
              <div>Password confirmation</div>
              <input type="password" onChange={e => handleChange(e, setPassConf)} value={passConf} id="passwordConfirmation" placeholder="confirmation" />
            </label>
          </div>
        )}
        <div>
          <input type="submit" value="Submit" className="btn" />
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
  id: PropTypes.string.isRequired,
  handleApiRequest: PropTypes.func.isRequired,
  match: ReactRouterPropTypes.match.isRequired,
  setUserErr: PropTypes.func.isRequired,
  useAuth: PropTypes.func.isRequired,
  removeUserErr: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  setUserErr: err => dispatch(setUserError(err)),
  removeUserErr: () => dispatch(removeUserError),
});

export default connect(null, mapDispatchToProps)(Form);
