import React, { useState, useEffect, useContext } from 'react'
import { ModalContext } from '../../context/modal/ModalState';

import './style/modal.scss';

const Modal = () => {
  const { modalStatus, setModal } = useContext(ModalContext)
  
  const [modalClass, setModalClass] = useState('off')
  
  useEffect(() => {
    if(modalStatus === 'off') {
      setModalClass('go')

      setTimeout(() => {
        setModalClass('off')
      }, 700);
    } else if(modalStatus === 'on') {
      setModalClass('come')

      setTimeout(() => {
        setModalClass('on')
      }, 700);
    }
  }, [modalStatus])

  const onClick = e => {
    if(e.target.classList.contains('modal-container')) {
      closeModal()
    }
  }
  
  const closeModal = () => {
    console.log('close modal')
    setModal('off')
  }
  
  return (
    <div className={`modal-container ${modalStatus}`} onClick={onClick}>
      <div className='modal-body'>
        <div className='close-modal-btn'></div>
        moda content
        { modalClass }
      </div>
    </div>
  )
}

export default Modal
