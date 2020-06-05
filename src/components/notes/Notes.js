import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';

import Note from './Note';
import NoNotes from './NoNotes';

import './style/notes.scss';

import createLayout from './layout';

const Notes = ({ notes, selected }) => {
  const [noteElems, setNoteElems] = useState(null);
  const container = useRef(document.querySelector('.notes-container'));

  useEffect(() => {
    populateDom();
    // eslint-disable-next-line
  }, [notes, selected]);

  const populateDom = async () => {
    await putNotes();
    createLayout(container.current);
  };

  // this funciton runs in order to wait a little for ref to load current
  const putNotes = () => {
    setNoteElems(
      notes.map((note) => (
        <Note
          key={note._id}
          note={note}
          selected={selected.indexOf(note._id) !== -1 && true}
          selecting={selected.length > 0 ? true : false}
        />
      ))
    );
  };

  if (document.readyState === 'complete') {
    window.addEventListener('resize', () => {
      container.current && createLayout(container.current);
    });
  }

  if (notes.length === 0) {
    return <NoNotes />;
  } else {
    return (
      <div className="notes-wrapper">
        <div ref={container} className="notes-container">
          {noteElems}
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  selected: state.note.selected,
});

export default connect(mapStateToProps)(Notes);
