import React, { useRef } from 'react';
import { connect } from 'react-redux';
import Tag from './Tag';
import NoteHeader from './NoteHeader';

import { deleteNote } from 'store/actions/note';

import './style/note.scss';

const Note = ({ note, deleteNote, showDelete }) => {
  const { _id, tag, otherTags } = note;

  const noteElem = useRef('');

  setTimeout(() => {
    noteElem.current.style.setProperty('--c', tag.color);
  }, 1);

  return (
    <div ref={noteElem} className="note">
      <div className="note-header">
        <NoteHeader tag={tag} _id={_id} />
      </div>
      {note.body}
      <div className="note-footer">
        {otherTags.map((tag) => (
          <Tag key={tag._id} tag={tag} />
        ))}
        {showDelete && (
          <span onClick={() => deleteNote(_id)} className="delete-note-btn">
            &times;
          </span>
        )}
      </div>
    </div>
  );
};

export default connect(null, { deleteNote })(Note);
