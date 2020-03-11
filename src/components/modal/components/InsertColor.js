import React, { useState } from 'react';
import axios from 'axios';

import './insertcolor.scss';

const InsertColor = () => {
  const [hex, setHex] = useState('000000')
  const [type, setType] = useState('hex')

  const onHexChange = e => {
    setHex(e.target.value)
  }

  const onRGBChange = () => {
    
  }

  const onSumbit = () => {
    axios.post('/colors', {
      color: 'color'
    })

    console.log('here')
  }

  const onToggle = () => {
    type === 'hex' ? setType('rgb') : setType('hex')
  }
  
  const color = {
    background: hex.length === 3 || hex.length === 4 || hex.length === 6 || hex.length === 8
      ? `#${hex}`
      : 'transparent'
  }
  
  return (
    <div className='insert-color-section'>
      <div className='insert-color-color' style={color}>
      
      </div>
      <div className={`insert-color-toggle ${type}`} onClick={onToggle}>
        <div className='back-layer'>
        
        </div>
        <div className='rgb'>
          RGB
        </div>
        <div className='hex'>
          HEX
        </div>
      </div>
      <div className={`insert-color-input ${type}`}>
        <div className='insert-color-rgb'>
          <input type='number' min='0' max='255' step='1' placeholder='red' />
          <input type='number' min='0' max='255' step='1' placeholder='green' />
          <input type='number' min='0' max='255' step='1' placeholder='blue' />
        </div>
        <div className='insert-color-hex'>
          #<input type='text' value={hex} onChange={onHexChange} />
        </div>
      </div>
      <div className='insert-color-button'>
        <input type='submit' value='Add' onClick={onSumbit} />
      </div>
    </div>
  )
}

export default InsertColor
