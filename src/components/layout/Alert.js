import React, { useState, useEffect, useContext } from 'react'

import { AlertContext } from '../../context/alert/AlertState';

import './style/alert.scss';

const Alert = () => {
  const { alertStatus, alertMsg, alertType} = useContext(AlertContext)

  const [alertClass, setAlertClass] = useState('off')
  
  useEffect(() => {
    if(alertStatus === 'off') {
      setAlertClass('go')

      setTimeout(() => {
        setAlertClass('off')
      }, 500);
    } else if(alertStatus === 'on') {
      setAlertClass('come')

      setTimeout(() => {
        setAlertClass('on')
      }, 500);
    }
    // eslint-disable-next-line
  }, [alertStatus])
  
  return (
    <div className={`alert ${alertClass} alert-${alertType}`}>
      alert
      { alertMsg }
    </div>
  )
}

export default Alert
