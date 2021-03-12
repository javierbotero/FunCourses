import React from 'react';
import PropTypes from 'prop-types';
import { useAuthState, authContext } from '../helpers/authHelpers';

const Auth = ({ children }) => {
  const auth = useAuthState();
  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  );
};

Auth.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Auth;
