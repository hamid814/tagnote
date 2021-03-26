import React from 'react';

// utilities
import options from './options';

// style
import './optionsModal.scss';

const OptionsModal = ({ data }) => {
  const {
    subject,
    note,
    setModal,
    deleteNote,
    selectNote,
    openNotePage,
  } = data;

  const onOpenNote = () => {
    openNotePage();
  };

  const copyText = () => {};

  const functions = {
    openNote: openNotePage,
  };

  const onDeleteClick = () => {
    setModal('on', 'ask-modal', {
      title: 'Delete Note?',
      text: 'Are you sure you want to delete this note?',
      buttons: [
        {
          text: 'Delete',
          color: 'var(--red-color)',
          action: async (id) => {
            await deleteNote(id);
            setModal('off');
          },
          actionArg: note._id,
        },
        {
          text: 'No',
          color: 'var(--blue-color)',
          action: setModal,
          actionArg: 'off',
        },
      ],
    });
  };

  const onSelectNote = () => {
    selectNote(note._id);
    setModal('off');
  };

  const { title, list } = options[subject];

  return (
    <div className="options-modal-container">
      <div className="options-title">{title}</div>
      <ul className="options-list">
        {list.map((item) => (
          <li
            key={item.text}
            onClick={functions[item.action]}
            className="option-item"
          >
            {item.text}
          </li>
        ))}
        {subject === 'note' && (
          <>
            <li className="option-item" onClick={copyText}>
              <span role="img" aria-label="copy">
                ➿
              </span>{' '}
              Copy Text
            </li>
            <li className="option-item">
              <span role="img" aria-label="copy">
                📤
              </span>{' '}
              Get Share Link
            </li>
            <li className="option-item" onClick={onSelectNote}>
              <i className="icon icon-options-select"></i> Select
            </li>
            <li className="option-item">
              <span role="img" aria-label="pin">
                📌
              </span>{' '}
              Pin to top
            </li>
            <li className="option-item red" onClick={onDeleteClick}>
              <span role="img" aria-label="red-x-mark">
                ❌
              </span>{' '}
              Delete Note
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

console.log('resort acitons');

export default OptionsModal;
