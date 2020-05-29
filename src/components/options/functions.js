import store from 'store/store';

// access history
import history from 'utils/history';

// redux actions
import { closeOptions } from 'store/actions/options';
import { selectNote } from 'store/actions/note';
import { deleteNote } from 'store/actions/note';
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
    const el = document.createElement('textarea');
    el.value = note.body;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    dispatch(setAlert('on', 'Copied to clipboard', 'success', 2500));
  },
  selectNote: (note) => {
    dispatch(selectNote(note._id));
    dispatch(closeOptions());
  },
  getNoteShareLink: () => console.log('share link'),
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
              await dispatch(deleteNote(note._id));
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
};

console.log('%c getNoteshareLink is uncompelete', 'color: red');

export default functions;
