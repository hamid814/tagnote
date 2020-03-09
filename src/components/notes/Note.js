import React from 'react'
import Tag from './Tag';

import './style/note.scss';

const Note = ({ note }) => {
  const { tags } = note
  
  console.log(note)
  
  const borderColor = {
    borderColor: note.tags.first.color
  }
  
  return (
    <div className='note' style={borderColor}>
      from note
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
