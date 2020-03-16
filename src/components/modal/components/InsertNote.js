import React, { useState } from 'react'
import './insertnote.scss';

const InsertNote = () => {
  const [text, setText] = useState('')
  const [tag, setTag] = useState('')
  
  const onTextChange = e => {
    setText(e.target.value)
  }

  const onTagChange = e => {
    setTag(e.target.value)
  }
  
  return (
    <div className='insert-note'>
      <input
        type='text'
        className='insert-note-tag'
        placeholder='Tag'
        value={tag}
        onChange={onTagChange}/>
      <textarea
        className='insert-note-text'
        value={text}
        onChange={onTextChange}
        placeholder='Note...'
        rows='6'>
      </textarea>
      <br/>
      /other hashtags
    </div>
  )
}

export default InsertNote
