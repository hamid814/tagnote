import React from 'react'
import Note from './Note';

import './style/notes.scss';

const Notes = ({ notes }) => {
  return (
    <div className='notes-container'>
      {
        notes.map(note => (
          <Note key={note._id} note={note} />
        ))
      }
    </div>
  )
}

export default Notes
