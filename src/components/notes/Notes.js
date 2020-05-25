import React, { useRef } from 'react';
import { connect } from 'react-redux';

import Note from './Note';
import NoNotes from './NoNotes';

import './style/notes.scss';

const Notes = ({ notes, selected }) => {
  const container = useRef(document.querySelector('.notes-container'));

  const resizeMasonryItem = (item) => {
    const rowGap = parseInt(
      window
        .getComputedStyle(container.current)
        .getPropertyValue('grid-row-gap')
    );

    const rowHeight = parseInt(
      window
        .getComputedStyle(container.current)
        .getPropertyValue('grid-auto-rows')
    );

    var rowSpan = Math.ceil(
      (item.querySelector('.note').getBoundingClientRect().height + rowGap) /
        (rowHeight + rowGap)
    );

    item.style.gridRowEnd = 'span ' + rowSpan;

    item.querySelector('.note').style.height = rowSpan * 10 + 'px';
  };

  const resizeAllItems = (items) => {
    for (let i = 0; i < items.length; i++) {
      resizeMasonryItem(items[i]);
    }
  };

  window.addEventListener('load', () => {
    setTimeout(() => {
      resizeAllItems(container.current.children);
    }, 1000);
  });

  window.addEventListener('resize', () => {
    resizeAllItems(container.current.children);
  });

  if (notes.length === 0) {
    return <NoNotes />;
  } else {
    return (
      <div ref={container} className="notes-container">
        {notes.map((note) => (
          <Note
            key={note._id}
            note={note}
            selected={selected.indexOf(note._id) !== -1 && true}
            selecting={selected.length > 0 ? true : false}
          />
        ))}
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  selected: state.note.selected,
});

export default connect(mapStateToProps)(Notes);
