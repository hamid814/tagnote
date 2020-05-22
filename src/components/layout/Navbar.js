import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Logo from 'components/utils/logo/Logo';
import ThemeButton from 'components/utils/themebutton/ThemeButton';
import { setModal } from '../../store/actions/modal';

import './style/navbar.scss';

const Navbar = ({ setModal }) => {
  const onInsert = () => {
    setModal('on', 'quick-insert');
  };

  return (
    <div className="navbar">
      <div className="navbar-left">
        <Link to={process.env.PUBLIC_URL + '/auth/login'}>login</Link>
        <div>search</div>
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
};

export default connect(null, { setModal })(Navbar);
