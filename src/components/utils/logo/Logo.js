import React from 'react';
import './logo.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { setAlert } from 'store/actions/alert';
import { openOptions } from 'store/actions/options';

const Logo = ({ setAlert, openOptions }) => {
  const logoClicked = () => {
    setAlert('on', 'you successfully clicked on logo', 'success', 3000);
  };

  const rightClick = (e) => {
    e.preventDefault();

    openOptions({
      subject: 'logo',
    });
  };

  return (
    <Link to={`${process.env.PUBLIC_URL}/`} onContextMenu={rightClick}>
      <div className="logo" onClick={logoClicked}>
        <div className="col col-1">
          <div className="row row-1"></div>
          <div className="row row-2"></div>
          <div className="row row-3"></div>
        </div>
        <div className="col col-2">
          <div className="row row-1"></div>
          <div className="row row-2"></div>
          <div className="row row-3"></div>
        </div>
      </div>
    </Link>
  );
};

Logo.propTypes = {
  setAlert: PropTypes.func.isRequired,
  openOptions: PropTypes.func.isRequired,
};

export default connect(null, { setAlert, openOptions })(Logo);
