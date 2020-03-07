import React, { createContext, useReducer } from 'react';
import AlertReducer from './AlertReducer';

const initialState = {
  alertStatus: 'off',
  alertMsg: 'alert text',
  alertType: 'success'
};

export const AlertContext = createContext(initialState);

export const AlertProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AlertReducer, initialState);

  const setAlert = () => {
    dispatch({
      type: 'set-alert',
      payload: {

      }
    })
  }

  return (
    <AlertContext.Provider
      value={{
        alertStatus: state.alertStatus,
        alertMsg: state.alertMsg,
        alertType: state.alertType,
        setAlert,
      }}
    >
      { children }
    </AlertContext.Provider>
  );
};