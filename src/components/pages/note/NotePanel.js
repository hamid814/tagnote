import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

// redux
import { setModal } from 'store/actions/modal';
import { deleteNote } from 'store/actions/note';
import { updateNote } from 'store/actions/note';
import { setAlert } from 'store/actions/alert';

// components
import NoteBody from './panelComponents/NoteBody';
import PrimaryTag from './panelComponents/PrimaryTag';

// style
import './style/notePanel.scss';

const NotePanel = ({
  note,
  goToDisplay,
  setModal,
  deleteNote,
  history,
  updateNote,
  setAlert,
}) => {
  const [newNote, setNewNote] = useState({ ...note });
  const [isEdited, setIsEdited] = useState(false);

  const onSave = async () => {
    if (isEdited) {
      await delete newNote.I_id;
      await updateNote(note._id, newNote);
      goToDisplay();
      setIsEdited(false);
    } else {
      setAlert('on', "note hasn't canged", 'info', 2200);
      goToDisplay();
    }
  };

  const updateLocalNote = (data) => {
    setNewNote({
      ...newNote,
      ...data,
    });
    setIsEdited(true);
  };

  const updateNoteWithTag = (tag) => {
    updateLocalNote(tag);
    onSave();
  };

  const goToHome = () => history.push('/tagnote');

  const onDeleteClicked = () => {
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
  };

  return (
    <div className="note-page-panel">
      <div className="panel-header">
        <h3>Edit Note</h3>
        <input type="button" value="💾 Save" onClick={onSave} />
      </div>
      <div className="note-panel-primary-tag-wrapper">
        <PrimaryTag
          edit={updateLocalNote}
          tag={note.tag}
          updateTag={updateNoteWithTag}
        />
      </div>
      <div className="note-panel-note-body-wrapper">
        <NoteBody edit={updateLocalNote} body={note.body} />
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
  updateNote: PropTypes.func.isRequired,
  goToDisplay: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  note: PropTypes.object.isRequired,
};

export default connect(null, { setModal, deleteNote, updateNote, setAlert })(
  withRouter(NotePanel)
);
