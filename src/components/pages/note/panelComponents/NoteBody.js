import React, { useState } from 'react';

const NoteBody = ({ body, edit }) => {
  const [text, setText] = useState(body);

  const onChange = (e) => {
    setText(e.target.value);
  };

  const onBlur = (e) => {
    edit({ body: text });
  };

  return (
    <>
      <label>Body:</label>
      <div className="note-panel-note-body">
        <textarea
          type="text"
          value={text}
          onChange={onChange}
          onBlur={onBlur}
        />
      </div>
    </>
  );
};

export default NoteBody;
