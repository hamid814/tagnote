import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';

// components
import Tag from './Tag';
import NoteHeader from './NoteHeader';

// redux
import { deleteNote } from 'store/actions/note';
import { setModal } from 'store/actions/modal';

// style
import './style/note.scss';

const Note = ({
  note: { _id, tag, otherTags, date, body },
  setModal,
  deleteNote,
}) => {
  const noteElem = useRef('');

  setTimeout(() => {
    noteElem.current.style.setProperty('--c', tag.color);
  }, 1);

  const rightClick = (e) => {
    e.preventDefault();

    setModal('on', 'options-modal', {
      subject: 'note',
      setModal,
      deleteNote,
      note: { _id, tag, otherTags, date, body },
    });
  };

  const formattedDate = moment(date, 'YYYY-MM-DD/hh:mm:ss').format('YY/MM');

  return (
    <div ref={noteElem} onContextMenu={rightClick} className="note">
      <div className="note-header">
        <NoteHeader tag={tag} _id={_id} />
      </div>
      <div className="note-body">
        {body}
        <Link to={process.env.PUBLIC_URL + '/notes/' + _id}>link</Link>
      </div>
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
  );
};

Note.propTypes = {
  setModal: PropTypes.func.isRequired,
  deleteNote: PropTypes.func.isRequired,
};

export default connect(null, { setModal, deleteNote })(Note);
