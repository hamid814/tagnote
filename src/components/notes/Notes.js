import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';

import Note from './Note';
import NoNotes from './NoNotes';

import './style/notes.scss';

import createLayout from './layout';

var updateComp;

const Notes = ({ notes, selected }) => {
  // eslint-disable-next-line
  const [forceUpdate, setForceUpdate] = useState(0);
  const [noteElems, setNoteElems] = useState(null);
  const container = useRef(document.querySelector('.notes-container'));

  const forceComponentToUpdate = () => {
    setForceUpdate(forceUpdate + 1);
  };

  updateComp = forceComponentToUpdate;

  useEffect(() => {
    populateDom();
    // eslint-disable-next-line
  }, [notes, selected]);

  useEffect(() => {
    setTimeout(() => {
      createLayout(container.current);
    }, 200);
    // eslint-disable-next-line
  }, [forceUpdate]);

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

  const addResizeToWindow = () => {
    if (document.readyState === 'complete') {
      window.addEventListener('resize', () => {
        container.current && createLayout(container.current);
      });

      // stop running function
      clearInterval(setEvent);
    }
  };

  // run function to add resize event when the document is loaded
  const setEvent = setInterval(addResizeToWindow, 500);

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

export const updateLayout = () => {
  typeof updateComp === 'function' && updateComp();
};

const mapStateToProps = (state) => ({
  selected: state.note.selected,
});

export default connect(mapStateToProps)(Notes);
