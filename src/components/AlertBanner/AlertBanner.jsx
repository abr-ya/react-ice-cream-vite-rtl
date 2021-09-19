import React from 'react';
import PropTypes from 'prop-types';
import Alert from 'react-bootstrap/Alert';

const AlertBanner = ({ message, variant }) => (
  <Alert variant={variant} style={{ backgroundColor: 'red' }}>
    {message}
  </Alert>
);

AlertBanner.propTypes = {
  message: PropTypes.string,
  variant: PropTypes.string,
};

AlertBanner.defaultProps = {
  message: 'An unexpected error occurred. Please try again later.',
  variant: 'danger',
};

export default AlertBanner;
