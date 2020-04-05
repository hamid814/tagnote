import React, { useRef } from 'react'
import Tag from './Tag';
import NoteHeader from './NoteHeader';

import './style/note.scss';

const Note = ({ note }) => {
  const { _id, tag, otherTags } = note
  
  const noteElem = useRef('')
  
  setTimeout(() => {
    noteElem.current.style.setProperty('--c', tag.color)
  }, 1);

  return (
    <div ref={noteElem} className='note'>
      <div className='note-header'>
        <NoteHeader tag={tag} _id={_id} />
      </div>
      { note.body }
      <div className='note-footer'>
        {
          otherTags.map(tag => (
            <Tag key={tag._id} tag={tag} />
          ))
        }
      </div>
    </div>
  )
}

export default Note
