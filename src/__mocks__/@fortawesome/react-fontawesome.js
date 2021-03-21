import React from 'react';
import PropTypes from 'prop-types';

const FontAwesomeIcon = props => {
  const { icon } = props;
  return <i className={`fa ${icon}`} />;
};

FontAwesomeIcon.propTypes = {
  icon: PropTypes.node.isRequired,
}

export {
  // eslint-disable-next-line import/prefer-default-export
  FontAwesomeIcon,
};
