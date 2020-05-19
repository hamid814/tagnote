import React from 'react';
import Note from './Note';
import NoNotes from './NoNotes';

import './style/notes.scss';

const Notes = ({ notes, showDelete }) => {
  console.log(notes);

  if (notes.length === 0) {
    return <NoNotes />;
  } else {
    return (
      <div className="notes-container">
        {notes.map((note) => (
          <Note key={note._id} note={note} showDelete={showDelete} />
        ))}
      </div>
    );
  }
};

Note.defaultProps = {
  showDelete: true,
};

export default Notes;
