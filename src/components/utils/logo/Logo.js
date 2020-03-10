import React, { useContext } from 'react'
import './logo.scss';

import { AlertContext } from '../../../context/alert/AlertState';

const Logo = () => {
  const { setAlert } = useContext(AlertContext)

  const alert = () => {
    setAlert('on', 'you successfully clicked on logo', 'success', 3000)
  }
  
  return (
    <div className='logo' onClick={alert}>
      <div className='col col-1'>
        <div className='row row-1'></div>
        <div className='row row-2'></div>
        <div className='row row-3'></div>
      </div>
      <div className='col col-2'>
        <div className='row row-1'></div>
        <div className='row row-2'></div>
        <div className='row row-3'></div>
      </div>
    </div>
  )
}

export default Logo
