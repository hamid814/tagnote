import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// components
import Logo from 'components/utils/logo/Logo';

// redux
import { getTags } from 'store/actions/tag';
import { setModal } from 'store/actions/modal';
import { logout } from 'store/actions/auth';

// style
import './menu.scss';

import { updateLayout } from 'components/notes/Notes';

var toggleMenu;

const Menu = ({ getTags, tags, isAuthenticated, user, setModal, logout }) => {
  const [state, setState] = useState('open'); // values: open, close, view

  useEffect(() => {
    getTags();
    // eslint-disable-next-line
  }, []);

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
    <div onClick={onLoginClick}>
      <span role="img" aria-label="orb">
        🔮
      </span>{' '}
      login
    </div>
  ) : (
    <div onClick={onLogoutClick}>
      <span role="img" aria-label="orb">
        🚧
      </span>{' '}
      {user.name}
    </div>
  );

  const setMenu = () => {
    state === 'open' ? setState('close') : setState('open');
    updateLayout();
  };

  const onContainerClick = (e) => {
    if (e.target.classList.contains('menu-container')) {
      setMenu();
    }
  };

  toggleMenu = setMenu;

  return (
    <div className={`menu-container ${state}`} onClick={onContainerClick}>
      <div className="menu-body">
        <div className="menu-close-btn" onClick={setMenu}>
          &times;
        </div>
        <div className="menu-logo">
          <Logo />
          <span>TagNote</span>
        </div>
        <div className="menu-user-area">{authButton}</div>
        <div className="menu-group">
          <div className="menu-group-title">
            <Link to={process.env.PUBLIC_URL}>
              <i className="icon icon-logo-square"></i>
              Home
            </Link>
          </div>
        </div>
        <div className="menu-group">
          <h3 className="menu-group-title">
            <i className="icon icon-logo-radius"></i>
            Notes
          </h3>
        </div>
        <div className="menu-group" tabIndex="1">
          <h3 className="menu-group-title">
            <i className="icon icon-logo-circle"></i>
            Tags
          </h3>
          {tags.map((tag) => (
            <div key={tag._id} className="menu-group-item">
              <Link
                to={process.env.PUBLIC_URL + '/tags/' + tag.slug}
                style={{ color: tag.color }}
              >
                {tag.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const openMenu = () => {
  toggleMenu();
};

Menu.propTypes = {
  tags: PropTypes.array,
  getTags: PropTypes.func.isRequired,
  setModal: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  user: PropTypes.object,
};

const mapStateToProps = (state) => ({
  tags: state.tag.tags,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps, { getTags, setModal, logout })(Menu);
