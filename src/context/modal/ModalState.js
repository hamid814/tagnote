import React, { createContext, useReducer } from 'react';
import ModalReducer from './ModalReducer';

const initialState = {
  modalStatus: 'first-off', // values: on, off, first-off
  modalType: 'none',
};

export const ModalContext = createContext(initialState);

export const ModalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ModalReducer, initialState);

  const setModal = (status, type) => {
    if(status === 'off') {
      dispatch({
        type: 'set-modal',
        payload: {
          status,
          type: state.modalType
        }
      })
    } else if(status === 'on') {
      dispatch({
        type: 'set-modal',
        payload: {
          status,
          type
        }
      })
    }
  }

  return (
    <ModalContext.Provider
      value={{
        modalStatus: state.modalStatus,
        modalType: state.modalType,
        setModal,
      }}
    >
      { children }
    </ModalContext.Provider>
  );
};