import React, { useState } from 'react'
import './themebutton.scss';

const ThemeButton = () => {
  const [state, setState] = useState('dark')

  const setLight = () => {
    document.body.style.setProperty('--bg-color', '#f4f4f4')
    document.body.style.setProperty('--text-color', '#222')
  }

  const setDark = () => {
    document.body.style.setProperty('--bg-color', '#333')
    document.body.style.setProperty('--text-color', '#f4f4f4')
  }

  const onClick = () => {
    if(state === 'dark') {
      setLight()
      setState('light')
    } else {
      setDark()
      setState('dark')
    }
  }
  
  return (
    <div>
      from <span onClick={onClick}>theme</span> changer
    </div>
  )
}

export default ThemeButton
