import React, { useState } from 'react';

// style
import './menu.scss';

var toggleMenu;

const Menu = ({ getTags }) => {
  const [state, setState] = useState('close'); // values: open, close, view

  // useEffect(() => {
  //   getTags();
  //   // eslint-disable-next-line
  // }, []);

  const setMenu = () => {
    state === 'open' ? setState('close') : setState('open');
  };

  toggleMenu = setMenu;

  return (
    <div className={`menu-container ${state}`}>
      from menu
      <button onClick={() => setMenu()}>click</button>
    </div>
  );
};

export const openMenu = () => {
  toggleMenu();
};

export default Menu;
