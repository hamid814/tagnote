import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

// redux
import { setModal } from 'store/actions/modal';
import { deleteNote } from 'store/actions/note';

// style
import './style/notePanel.scss';

const NotePanel = ({ note, goToDisplay, setModal, deleteNote, history }) => {
  const [tagText, setTagText] = useState(note.tag.name);

  const onTagTextChange = (e) => setTagText(e.target.value);

  const onSave = () => {
    goToDisplay();
  };

  const goToHome = () => history.push('/tagnote');

  const onDeleteClicked = () =>
    setModal('on', 'ask-modal', {
      title: 'Delete Note?',
      text: 'Are you sure you want to delete this note?',
      buttons: [
        {
          text: 'Delete',
          color: '#c32',
          action: async (id) => {
            await deleteNote(id);
            goToHome();
            setModal('off');
          },
          actionArg: note._id,
        },
        {
          text: 'No',
          color: '#88d',
          action: setModal,
          actionArg: 'off',
        },
      ],
    });

  const tagColor = {
    color: note.tag.color,
  };

  return (
    <div className="note-page-panel">
      <div className="panel-header">
        <h3>Edit Note</h3>
        <input type="button" value="💾 Save" onClick={onSave} />
      </div>
      <div className="note-panel-primary-tag-wrapper">
        <label>Tag:</label>
        <div className="note-panel-primary-tag">
          <input
            type="text"
            style={tagColor}
            value={tagText}
            onChange={onTagTextChange}
          />
          <input type="button" value="✔️" />
        </div>
      </div>
      <div className="note-panel-delete-note-wrapper" onClick={onDeleteClicked}>
        <span role="img" aria-label="x-mark-red">
          ❌
        </span>{' '}
        Delete Note
      </div>
    </div>
  );
};

NotePanel.propTypes = {
  setModal: PropTypes.func.isRequired,
  deleteNote: PropTypes.func.isRequired,
  goToDisplay: PropTypes.func.isRequired,
  note: PropTypes.object.isRequired,
};

export default connect(null, { setModal, deleteNote })(withRouter(NotePanel));
