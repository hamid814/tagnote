import React, { useContext } from 'react'

import Logo from './../logo/Logo';
import { ModalContext } from '../../context/modal/ModalState';

import './style/navbar.scss';

const Navbar = () => {
  const { setModal } = useContext(ModalContext)
  
  const onInsert = () => {
    setModal('on', 'insert')
  }
  
  return (
    <div className='navbar'>
      <div>
        1
      </div>
      <div>
        <Logo />
      </div>
      <div>
        <button className='insert-button' onClick={onInsert}>
          insert
        </button>
      </div>
    </div>
  )
}

export default Navbar
