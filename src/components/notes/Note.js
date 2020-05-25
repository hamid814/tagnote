import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';

// components
import Tag from './Tag';
import NoteHeader from './NoteHeader';

// redux
import { deleteNote } from 'store/actions/note';
import { selectNote } from 'store/actions/note';
import { unSelectNote } from 'store/actions/note';
import { setModal } from 'store/actions/modal';

// style
import './style/note.scss';

const Note = ({
  note: { _id, tag, otherTags, date, body },
  setModal,
  deleteNote,
  selected,
  selectNote,
  unSelectNote,
  selecting,
  history,
}) => {
  const noteLink = process.env.PUBLIC_URL + '/notes/' + _id;

  const noteElem = useRef('');

  setTimeout(() => {
    noteElem.current.style.setProperty('--c', tag.color);
  }, 1);

  const openNotePage = () => {
    history.push(noteLink);
  };

  const onClick = () => {
    if (selecting) {
      if (selected) {
        unSelectNote(_id);
      } else {
        selectNote(_id);
      }
    } else {
      openNotePage();
    }
  };

  const rightClick = (e) => {
    e.preventDefault();

    if (!selecting) {
      setModal('on', 'options-modal', {
        subject: 'note',
        setModal,
        deleteNote,
        selectNote,
        openNotePage,
        note: { _id, tag, otherTags, date, body },
      });
    }
  };

  const formattedDate = moment(date, 'YYYY-MM-DD/hh:mm:ss').format('YY/MM');

  return (
    <div
      ref={noteElem}
      onClick={onClick}
      onContextMenu={rightClick}
      className={`note-wrapper ${selected && 'selected'}`}
    >
      <div className="note" style={{ minHeight: '100%' }}>
        <div className="note-header">
          <NoteHeader tag={tag} _id={_id} />
        </div>
        <p className="note-body">{body}</p>
        <div className="note-footer">
          <div>
            {otherTags.slice(0, 3).map((tag) => (
              <Tag key={tag._id} tag={tag} />
            ))}
            {otherTags.length > 3 && '...'}
          </div>
          <div className="note-date">{formattedDate}</div>
        </div>
      </div>
    </div>
  );
};

Note.propTypes = {
  setModal: PropTypes.func.isRequired,
  deleteNote: PropTypes.func.isRequired,
  selectNote: PropTypes.func.isRequired,
  unSelectNote: PropTypes.func.isRequired,
};

export default connect(null, {
  setModal,
  deleteNote,
  selectNote,
  unSelectNote,
})(withRouter(Note));
