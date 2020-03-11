import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Tag from './Tag';
import NoteHeader from './NoteHeader';

import './style/note.scss';

const Note = ({ note }) => {
  const { tags } = note
  
  const [primaryTag, setPrimaryTag] = useState({})
  
  useEffect(() => {
    try {
      axios.get(`/tags/${tags.primary}`)
        .then(res => setPrimaryTag(res.data))
    } catch (error) {
      console.log(error)
    }
    // eslint-disable-next-line
  }, [])
  
  const borderColor = {
    borderColor: primaryTag.color,
    borderTopColor: primaryTag.color,
    // borderRightColor: primaryTag.color,
    borderLeftColor: primaryTag.color,
  }
  
  return (
    <div className='note' style={borderColor}>
      <div className="note-header">
        <NoteHeader tag={primaryTag} />
      </div>
      { note.text }
      <div className='note-footer'>
        {/* <Tag tag={tags.primary} /> */}
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
