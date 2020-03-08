import React, { useState, useEffect, useContext } from 'react'

import { AlertContext } from '../../context/alert/AlertState';

import './style/alert.scss';

const Alert = () => {
  const { alertStatus, alertMsg, alertType, setAlert} = useContext(AlertContext)

  const [alertClass, setAlertClass] = useState('off')
  
  useEffect(() => {
    if(alertStatus === 'off') {
      setAlertClass('go')

      setTimeout(() => {
        setAlertClass('off')
      }, 480);
    } else if(alertStatus === 'on') {
      setAlertClass('come')

      setTimeout(() => {
        setAlertClass('on')
      }, 480);
    } else if(alertStatus === 'first-off') {
      setAlertClass('off')
    }
    // eslint-disable-next-line
  }, [alertStatus])

  const onClick = () => {
    setAlert('off')
  }
  
  return (
    <div className={`alert ${alertClass} alert-${alertType}`} onClick={onClick}>
      { alertMsg }
    </div>
  )
}

export default Alert
