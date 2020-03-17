import React, { useState } from 'react'
import './inserttag.scss';

const InsertTag = () => {
  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')
  const [color, setColor] = useState('')
  
  const onNameChange = e => {
    setName(e.target.value)
  }
  
  const onDescChange = e => {
    setName(e.target.value)
  }
  
  const Textcolor = {
    color: `#${color}`
  }

  return (
    <div className='insert-tag-section'>
      <div className='insert-tag-name' style={Textcolor}>
        #<input
          type='text'
          style={Textcolor}
          placeholder='Tag name'
          value={name}
          onChange={onNameChange} />
      </div>
      <textarea placeholder='tag descriptin' className='insert-tag-desc' value={desc} onChange={onDescChange}>

      </textarea>
    </div>
  )
}

export default InsertTag
