import React from 'react';

// style
import './askmodal.scss';

const AskModal = ({ data: { title, text, buttons }, closeModal }) => {
  return (
    <div className="ask-modal-container">
      <div className="ask-modal-title">{title}</div>
      <div className="ask-modal-text">{text}</div>
      <div className="ask-modal-buttons">
        {buttons && buttons.length !== 0 ? (
          buttons.map((btn) => (
            <button
              key={btn.text}
              onClick={() => btn.action(btn.actionArg)}
              style={{
                color: btn.color,
                flexBasis: `${100 / buttons.length}%`,
              }}
            >
              {btn.text}
            </button>
          ))
        ) : (
          <button
            onClick={closeModal}
            style={{
              color: '#2a4',
              flexBasis: `100%`,
            }}
          >
            Close
          </button>
        )}
      </div>
    </div>
  );
};

export default AskModal;
