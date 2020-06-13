import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SelectingPanel from './SelectingPanle';
import Logo from 'components/utils/logo/Logo';
import ThemeButton from 'components/utils/themebutton/ThemeButton';

import { setModal } from 'store/actions/modal';

import { openMenu } from 'components/menu/Menu';

import './style/navbar.scss';

const Navbar = ({ setModal }) => {
  const onInsert = () => {
    setModal('on', 'quick-insert');
  };

  return (
    <div className="navbar">
      <SelectingPanel />
      <div className="navbar-left">
        <div
          onClick={openMenu}
          style={{
            transform: 'rotate(90deg)',
            fonstSize: 18,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: '100',
            border: '1px solid red',
            padding: 7,
            color: 'var(--blue-color)',
            marginRight: 10,
            paddingTop: 5,
            letterSpacing: '1px',
          }}
        >
          |||
        </div>
        <span>TagNote</span>
      </div>
      <div className="navbar-logo">
        <div className="mobile-display-none">
          {' '}
          <Logo />
        </div>
      </div>
      <div className="navbar-right">
        <i className="icon icon-saerch"></i>
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
};

export default connect(null, {
  setModal,
})(Navbar);
