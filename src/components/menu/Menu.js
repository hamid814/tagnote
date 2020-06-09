import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

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

  const setMenu = () => {
    state === 'open' ? setState('close') : setState('open');
    updateLayout();
  };

  toggleMenu = setMenu;

  return (
    <div className={`menu-container ${state}`}>
      <button onClick={() => setMenu()}>click</button>
      {tags.map((tag) => (
        <Link
          to={process.env.PUBLIC_URL + '/tags/' + tag.slug}
          key={tag._id}
          style={{ color: tag.color, padding: 7, display: 'block' }}
        >
          #{tag.name}
        </Link>
      ))}
      {authButton}
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
