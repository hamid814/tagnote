import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { setAlert } from 'store/actions/alert';

import './style/alert.scss';

const Alert = ({ alertState }) => {
  const { alertStatus, alertType, alertMsg } = alertState;

  const [alertClass, setAlertClass] = useState('off');

  useEffect(() => {
    if (alertStatus === 'off') {
      setAlertClass('go');

      setTimeout(() => {
        setAlertClass('off');
      }, 380);
    } else if (alertStatus === 'on') {
      setAlertClass('come');

      setTimeout(() => {
        setAlertClass('on');
      }, 380);
    } else if (alertStatus === 'first-off') {
      setAlertClass('off');
    }
    // eslint-disable-next-line
  }, [alertStatus]);

  const onClick = () => {
    setAlert('off');
  };

  return (
    <div className={`alert ${alertClass} alert-${alertType}`} onClick={onClick}>
      {alertMsg}
    </div>
  );
};

Alert.propTypes = {
  alertState: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  alertState: state.alert,
});

export default connect(mapStateToProps)(Alert);
