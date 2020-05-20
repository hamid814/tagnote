import React from 'react';
import './logo.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { setAlert } from 'store/actions/alert';

const Logo = ({ setAlert }) => {
  const logoClicked = () => {
    setAlert('on', 'you successfully clicked on logo', 'success', 3000);
  };

  return (
    <Link to={`${process.env.PUBLIC_URL}/`}>
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
};

export default connect(null, { setAlert })(Logo);
