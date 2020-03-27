import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import Tag from './Tag';
import NoteHeader from './NoteHeader';

import './style/note.scss';

const Note = ({ note }) => {
  const { tags, id } = note
  
  const noteElem = useRef('')
  
  const [primaryTag, setPrimaryTag] = useState({})
  
  useEffect(() => {
    try {
      axios.get(`/tags/id/${tags.primary}`)
        .then(res => setPrimaryTag(res.data))
    } catch (error) {
      console.log(error)
    }
    // eslint-disable-next-line
  }, [])
  
  const borderColor = {
    // borderColor: primaryTag.color,
    // borderRadius: 0,
  }

  noteElem.current && noteElem.current.style.setProperty('--c', primaryTag.color)
    
  return (
    <div ref={noteElem} className='note' style={borderColor}>
      <div className='note-header'>
        <NoteHeader tag={primaryTag} id={id} />
      </div>
      { note.text }
      <div className='note-footer'>
        {
          tags.other.map(tag => (
            <Tag key={tag} tag={tag} />
          ))
        }
      </div>
    </div>
  )
}

export default Note
