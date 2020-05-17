import React, { useState } from 'react';
import axios from 'axios';

const AddOther = ({ tags, primaryTagId, setTags }) => {
  const [text, setText] = useState('');
  const [tag, setTag] = useState({});

  const onChange = async (e) => {
    const value = e.target.value;

    setText(e.target.value);
    const res = await axios.get(`/api/v1/tags/?find=${value}`);

    const data = res.data.data.sort((a, b) => b.name.length - a.name.length);

    if (data.length !== 0 && value !== '') {
      if (data.length === 1) {
        // only one tag is responsed
        setTag(data[0]);
      } else {
        // several tags responsed => get the one with exact same name
        let index = 0;
        while (
          data[index] &&
          tags.map((t) => t._id).indexOf(data[index]._id) === -1
        ) {
          setTag(data[index]);
          index++;
        }
      }
    }

    // clear state if nothing returned form server
    res.data.length === 0 && setTag({});

    if (value === '') {
      setTag({});
    }
  };

  const onKeyUp = (e) => {
    if (e.keyCode === 39 || e.keyCode === 13) {
      // arrow right pushed
      addTag();
      setTag({});
    }
  };

  const addTag = () => {
    if (tag._id) {
      if (tags.map((t) => t._id).indexOf(tag._id) === -1) {
        if (tag._id !== primaryTagId) {
          const newList = [...tags, tag];
          setTags(newList);
        }
      }
    }

    setText('');
    setTag({});
  };

  const bg = {
    background: tag.color ? tag.color : 'transparent',
  };

  return (
    <div className="add-note-other-input">
      <div>
        #
        <input
          type="text"
          onKeyUp={onKeyUp}
          value={text}
          placeholder="other tag"
          onChange={onChange}
        />
      </div>
      <div className="other-tag-sug" style={bg} onClick={addTag}>
        {tag.name ? tag.name : text !== '' && 'Not Found'}
      </div>
    </div>
  );
};

export default AddOther;
