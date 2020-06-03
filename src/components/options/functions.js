import store from 'store/store';

// access history
import history from 'utils/history';

// redux actions
import { closeOptions } from 'store/actions/options';
import * as noteActions from 'store/actions/note';
import { setModal } from 'store/actions/modal';
import { setAlert } from 'store/actions/alert';

const dispatch = store.dispatch;

const functions = {
  openNote: (note) => {
    history.push(process.env.PUBLIC_URL + '/notes/' + note._id);
    dispatch(closeOptions());
  },
  copyNoteText: (note) => {
    dispatch(closeOptions());
    copyText(note.body);
  },
  selectNote: (note) => {
    dispatch(noteActions.selectNote(note._id));
    dispatch(closeOptions());
  },
  getNoteShareLink: async (note) => {
    const url = await noteActions.getNoteShareLink(note._id, dispatch);
    dispatch(closeOptions());
    dispatch(
      setModal('on', 'ask-modal', {
        title: 'Note Link',
        text: url,
        buttons: [
          {
            text: 'Copy',
            color: 'var(--green-color)',
            action: (text) => {
              copyText(text, 'Url Copied!');
              dispatch(setModal('off'));
            },
            actionArg: url,
          },
        ],
      })
    );
  },
  deleteNote: async (note) => {
    dispatch(closeOptions());
    dispatch(
      setModal('on', 'ask-modal', {
        title: 'Delete Note?',
        text: 'sure to Delete Note?',
        buttons: [
          {
            text: 'Delete',
            color: 'var(--red-color)',
            action: async () => {
              await dispatch(noteActions.deleteNote(note._id));
              dispatch(setModal('off'));
            },
          },
          {
            text: 'No',
            color: 'var(--blue-color)',
            action: () => dispatch(setModal('off')),
          },
        ],
      })
    );
  },
  makePersonal: async (note) => {
    await dispatch(noteActions.makePersonal(note._id));
    dispatch(closeOptions());
  },
};

const copyText = (text, alert = 'Copied to clipboard!') => {
  const el = document.createElement('textarea');
  el.value = text;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  store.dispatch(setAlert('on', alert, 'success', 3000));
};

export default functions;
