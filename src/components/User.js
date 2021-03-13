import React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Link } from 'react-router-dom';

const User = props => {
  const { match, location } = props;
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to={{
              pathname: location.state.from.pathname,
              state: { from: location },
            }}
            >
              &#60;
            </Link>
          </li>
        </ul>
      </nav>
      <h1>User</h1>
      <div>
        <h1>
          id:
          {match.params.id}
        </h1>
      </div>
      <div>
        <h1>
          location:
          {location.state.from.pathname}
        </h1>
      </div>
    </div>
  );
};

User.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
  location: ReactRouterPropTypes.location.isRequired,
};

export default User;
