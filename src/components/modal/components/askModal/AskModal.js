import React from 'react';

// style
import './askmodal.scss';

const AskModal = ({ data: { title, text, buttons } }) => {
  return (
    <div className="ask-modal-container">
      <div className="ask-modal-title">{title}</div>
      <div className="ask-modal-text">{text}</div>
      <div className="ask-modal-buttons">
        {buttons.map((btn) => (
          <button
            key={btn.text}
            onClick={() => btn.action(btn.actionArg)}
            style={{
              color: btn.color,
              flexBasis: `${94 / buttons.length}%`,
            }}
          >
            {btn.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AskModal;
