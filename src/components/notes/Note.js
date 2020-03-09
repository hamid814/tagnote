import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Tag from './Tag';

import './style/note.scss';

const Note = ({ note }) => {
  const { tags } = note
  
  const [primaryTag, setPrimaryTag] = useState({})
  
  useEffect(() => {
    try {
      axios.get(`/tags/${tags.first.id}`)
        .then(res => setPrimaryTag(res.data))
    } catch (error) {
      console.log(error)
    }
    // eslint-disable-next-line
  }, [])
  
  const borderColor = {
    borderColor: primaryTag.color
  }
  
  return (
    <div className='note' style={borderColor}>
      { note.text }
      <div className='note-footer'>
        <Tag tag={tags.first} />
        {
          tags.other.map(tag => (
            <Tag key={tag.id} tag={tag} />
          ))
        }
      </div>
    </div>
  )
}

export default Note
