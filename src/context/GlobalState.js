import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

const initialState = {
  test: 'test text',
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const testFunc = () => {
    dispatch({
      type: 'test',
      payload: 'test-text-2'
    })
  }

  return (
    <GlobalContext.Provider
      value={{
        test: state.test,
        testFunc,
      }}
    >
      { children }
    </GlobalContext.Provider>
  );
};