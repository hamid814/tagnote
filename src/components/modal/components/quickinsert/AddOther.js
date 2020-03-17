import React, { useState } from 'react'
import axios from 'axios';

const AddOther = () => {
  const [text, setText] = useState('')
  
  const onChange = e => {
    setText(e.target.value)
  }
  
  return (
    <div className='add-note-other-input'>
      #
      <input type='text' value={text} placeholder='other tag' onChange={onChange}/>
    </div>
  )
}

export default AddOther
