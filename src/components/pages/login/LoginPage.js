import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

// form
import LoginForm from 'components/forms/auth/LoginForm';

// actions
import { login } from 'store/actions/auth';

// style
import './loginPage.scss';

const LoginPage = ({ login, error }) => {
  const history = useHistory();

  const [message, setMessage] = useState('');

  useEffect(() => {
    if (error !== 'Please login first!') {
      setMessage(error);
    }
  }, [error]);

  const formAction = async (formData) => {
    const success = await login(formData);

    if (success) {
      history.push('/');
    }
  };

  return (
    <div className="login-page">
      <div className="login-form-wrapper">
        <LoginForm message={message} action={formAction} />
      </div>
    </div>
  );
};

LoginPage.propTypes = {
  login: PropTypes.func.isRequired,
};

const masStateToProps = (state) => ({
  error: state.auth.error,
});

export default connect(masStateToProps, { login })(LoginPage);
