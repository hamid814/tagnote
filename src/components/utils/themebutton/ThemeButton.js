import React, { useState } from 'react';
import './themebutton.scss';

const ThemeButton = () => {
  const [theme, setTheme] = useState('dark');

  const setLight = () => {
    document.body.style.setProperty('--bg-color', '#f4f4f4');
    document.body.style.setProperty('--text-color', '#222');
  };

  const setDark = () => {
    document.body.style.setProperty('--bg-color', '#333');
    document.body.style.setProperty('--text-color', '#f4f4f4');
  };

  const onClick = () => {
    if (theme === 'dark') {
      setLight();
      setTheme('light');
    } else {
      setDark();
      setTheme('dark');
    }
  };

  return (
    <div className={`tagnote-theme-changer-btn ${theme}`}>
      <span onClick={onClick}>
        {theme === 'dark' ? (
          <i className="icon icon-light-off"></i>
        ) : (
          <i className="icon icon-light-on"></i>
        )}
      </span>
    </div>
  );
};

export default ThemeButton;
