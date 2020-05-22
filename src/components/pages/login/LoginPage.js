import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { login } from 'store/actions/auth';

const LoginPage = ({ login }) => {
  return <div>from login page</div>;
};

LoginPage.propTypes = {
  login: PropTypes.func.isRequired,
};

export default connect(null, { login })(LoginPage);
