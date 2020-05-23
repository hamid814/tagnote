import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Logo from 'components/utils/logo/Logo';
import ThemeButton from 'components/utils/themebutton/ThemeButton';

import { setModal } from 'store/actions/modal';
import { logout } from 'store/actions/auth';

import './style/navbar.scss';

const Navbar = ({ setModal, isAuthenticated, logout, user }) => {
  const onLoginClick = () => {
    setModal('on', 'login-modal');
  };

  const onLogoutClick = () => {
    setModal('on', 'ask-modal', {
      title: 'Log Out?',
      text: 'log out from your account?',
      buttons: [
        {
          text: 'Logout',
          color: 'var(--yellow-color)',
          action: () => {
            logout();
            setModal('off');
          },
        },
        {
          text: 'No',
          color: 'var(--blue-color)',
          action: setModal,
          actionArg: 'off',
        },
      ],
    });
    // logout();
  };

  const authButton = !isAuthenticated ? (
    <div className="login-btn" onClick={onLoginClick}>
      <span role="img" aria-label="note">
        🔮
      </span>
      login
    </div>
  ) : (
    <div className="login-btn" onClick={onLogoutClick}>
      <span role="img" aria-label="note">
        🔮
      </span>
      logout
    </div>
  );

  const onInsert = () => {
    setModal('on', 'quick-insert');
  };

  return (
    <div className="navbar">
      <div className="navbar-left">
        {authButton}
        {isAuthenticated && <span>{user.name}</span>}
        <div className="search">search</div>
      </div>
      <div className="navbar-logo">
        <Logo />
      </div>
      <div className="navbar-right">
        <ThemeButton />
        <button className="insert-button" onClick={onInsert}>
          <span role="img" aria-label="note">
            📝
          </span>
          Insert
        </button>
      </div>
    </div>
  );
};

Navbar.propTypes = {
  setModal: PropTypes.func.isRequired,
  user: PropTypes.object,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps, { setModal, logout })(Navbar);
