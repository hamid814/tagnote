import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SelectingPanel from './SelectingPanle';
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
  };

  const authButton = !isAuthenticated ? (
    <div className="login-btn" onClick={onLoginClick}>
      <span role="img" aria-label="orb">
        🔮
      </span>{' '}
      login
    </div>
  ) : (
    <div className="login-btn" onClick={onLogoutClick}>
      <span role="img" aria-label="orb">
        🚧
      </span>{' '}
      {user.name}
    </div>
  );

  const onInsert = () => {
    setModal('on', 'quick-insert');
  };

  return (
    <div className="navbar">
      <SelectingPanel />
      <div className="navbar-left">
        {authButton}
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
          <span className="mobile-display-none">Insert</span>
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

export default connect(mapStateToProps, {
  setModal,
  logout,
})(Navbar);
