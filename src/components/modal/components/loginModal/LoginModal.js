// modules
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// compos
import LoginForm from 'components/forms/auth/LoginForm';

// redux
import { login } from 'store/actions/auth';

// style
import './loginModal.scss';

const LoginModal = ({ login, error, setModal }) => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    setMessage(error);
  }, [error]);

  const formAction = async (formData) => {
    const success = await login(formData);

    if (success) {
      setModal('off');
    }
  };

  return (
    <div className="login-modal-container">
      <h3 className="login-modal-title">Login</h3>
      <div className="login-form-wrapper">
        <LoginForm message={message} action={formAction} />
      </div>
    </div>
  );
};

LoginModal.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  error: PropTypes.string,
  user: PropTypes.object,
  setModal: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  error: state.auth.error,
});

export default connect(mapStateToProps, { login })(LoginModal);
