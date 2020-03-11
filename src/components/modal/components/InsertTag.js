import React, { useState } from 'react'
import './inserttag.scss';

const InsertTag = () => {
  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')
  const [color, setColor] = useState('6c9')
  
  const onNameChange = e => {
    setName(e.target.value)
  }
  
  const Textcolor = {
    color: `#${color}`
  }

  const borderColor = {
    borderColor: `#${color}`
  }
  
  return (
    <div className='insert-tag-section' style={borderColor}>
      <div className='insert-tag-name' style={Textcolor}>
        #<input
          type='text'
          style={Textcolor}
          placeholder='Tag name'
          value={name}
          onChange={onNameChange} />
      </div>
      <div className='insert-tag-desc'>
        <textarea value={desc}>

        </textarea>
      </div>
    </div>
  )
}

export default InsertTag
