import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Logo from 'components/utils/logo/Logo';
import ThemeButton from 'components/utils/themebutton/ThemeButton';

import { setModal } from 'store/actions/modal';
import { openOptions } from 'store/actions/options';
import { logout } from 'store/actions/auth';
import { unSelecteAll } from 'store/actions/note';
import { deleteSelectedNotes } from 'store/actions/note';

import './style/navbar.scss';

const Navbar = ({
  setModal,
  isAuthenticated,
  logout,
  user,
  selected,
  unSelecteAll,
  deleteSelectedNotes,
  openOptions,
}) => {
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

  const onDeleteSelectedClicked = () => {
    setModal('on', 'ask-modal', {
      title: 'Delete notes?',
      text: 'Are you sure you want to Delete All selected Notes?',
      buttons: [
        {
          text: 'Delete',
          color: 'var(--red-color)',
          action: async () => {
            await deleteSelectedNotes();
            setModal('off');
          },
        },
        {
          text: 'No',
          color: 'var(--blue-color)',
          action: () => {
            setModal('off');
          },
        },
      ],
    });
  };

  const onSelectOptionsClicked = () => {
    openOptions({
      subject: 'selectedNotes',
    });
  };

  return (
    <div className="navbar">
      {selected.length > 0 && (
        <div className="navbar-seleting-panel">
          <div>
            <button className="cancel-select-btn" onClick={unSelecteAll}>
              &times;
            </button>
            <span className="navbar-selected-count">{selected.length}</span>
          </div>
          <div>
            <button onClick={onDeleteSelectedClicked}>delete</button>
            <button onClick={onSelectOptionsClicked}>...</button>
          </div>
        </div>
      )}
      <div className="navbar-left">
        {authButton}
        <div className="search">search</div>
      </div>
      <div className="navbar-logo">
        <Logo />
        <span style={{ marginLeft: 5 }}>TagNote</span>
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
  selected: PropTypes.array,
  unSelecteAll: PropTypes.func.isRequired,
  deleteSelectedNotes: PropTypes.func.isRequired,
  openOptions: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  selected: state.note.selected,
});

export default connect(mapStateToProps, {
  setModal,
  logout,
  unSelecteAll,
  deleteSelectedNotes,
  openOptions,
})(Navbar);
