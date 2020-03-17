import React, { createContext, useReducer } from 'react';
import AlertReducer from './AlertReducer';

const initialState = {
  alertStatus: 'first-off',
  alertMsg: 'alert text',
  alertType: 'success',
  alertTime: 1000
};

export const AlertContext = createContext(initialState);

export const AlertProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AlertReducer, initialState);

  const setAlert = (status, msg, type, time) => {
    const theType = status === 'on' ? type : state.alertType
    const theMsg = status === 'on' ? msg : state.alertMsg
    
    dispatch({
      type: 'set-alert',
      payload: {
        status,
        msg: theMsg,
        type: theType,
      }
    })

    setTimeout(() => {
      dispatch({
        type: 'set-alert',
        payload: {
          status: 'off',
          msg: theMsg,
          type: theType,
        }
      })
    }, time);
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