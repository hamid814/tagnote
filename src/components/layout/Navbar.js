import React, { useContext } from 'react'

import Logo from './../utils/logo/Logo';
import ThemeButton from '../utils/themebutton/ThemeButton';
import { ModalContext } from '../../context/modal/ModalState';

import './style/navbar.scss';

const Navbar = () => {
  const { setModal } = useContext(ModalContext)
  
  const onInsert = () => {
    setModal('on', 'quick-insert')
  }
  
  return (
    <div className='navbar'>
      <div className='navbar-left'>
        <div>
          right
        </div>
        <div>
          search
        </div>
      </div>
      <div>
        <Logo />
      </div>
      <div className='navbar-right'>
        <ThemeButton />
        <button className='insert-button' onClick={onInsert}>
          Insert
        </button>
      </div>
    </div>
  )
}

export default Navbar
