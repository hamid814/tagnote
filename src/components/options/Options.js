import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

//redux
import { closeOptions } from 'store/actions/options';

// utilities
import getList from './lists';
import functions from './functions';

// style
import './options.scss';

const OptionsModal = ({ status, data, closeOptions }) => {
  const [optionsClass, setOptionsClass] = useState('first-close');

  useEffect(() => {
    if (status === 'open') {
      setOptionsClass('opening');

      setTimeout(() => {
        setOptionsClass('open');
      }, 280);
    } else if (status === 'close') {
      setOptionsClass('closing');

      setTimeout(() => {
        setOptionsClass('close');
      }, 280);
    } else if (status === 'first-close') {
      setOptionsClass('close');
    }
  }, [status]);

  const onClick = (e) => {
    if (e.target.classList.contains('options-container')) {
      closeOptions();
    }
  };

  let note, setModal, deleteNote, selectNote, openNotePage;

  const { subject } = data;

  const onOpenNote = () => {
    openNotePage();
  };

  const copyText = () => {};

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

  const getFunction = (arg) => {
    if (typeof arg === 'function') {
      arg();
    } else if (typeof arg === 'string') {
      functions[arg]();
    } else {
      console.log('action not supprted');
    }
  };

  const { title, options } = getList(subject);

  return (
    <div className={`options-container ${optionsClass}`} onClick={onClick}>
      <div className="options-body">
        <div className="options-title">{title}</div>
        <ul className="options-list">
          {options.map((item) => (
            <li
              key={item.text}
              onClick={() => getFunction(item.action)}
              className="option-item"
            >
              {item.text}
            </li>
          ))}
          {/* {subject === 'note' && (
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
        )} */}
        </ul>
      </div>
    </div>
  );
};

console.log('resort acitons');
console.log('proptypes');

const mapStateToProps = (state) => ({
  status: state.options.status,
  data: state.options.data,
});

export default connect(mapStateToProps, { closeOptions })(OptionsModal);
