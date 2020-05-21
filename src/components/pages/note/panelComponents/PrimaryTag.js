import React, { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

// redux
import { addTag } from 'store/actions/tag';

const PrimaryTag = ({ edit, updateTag, tag, addTag }) => {
  const [text, setText] = useState(tag.name);
  const [sugs, setSugs] = useState([]);
  const [newTag, setNewTag] = useState(tag);

  const onChange = (e) => {
    const value = e.target.value.toLowerCase();
    setText(e.target.value);

    getTags(value);
  };

  const onFocus = (e) => {
    getTags(e.target.value.toLowerCase());
  };

  const getTags = async (text) => {
    const res = await axios.get(`/api/v1/tags?find=${text}`);

    setSugs(res.data.data);
  };

  const selectTag = (tag) => {
    setNewTag(tag);
    setText(tag.name);
    edit({ tag });
  };

  const onCreateTag = async () => {
    const fastAddedTag = await addTag({
      name: text,
      description: 'fast added tag',
    });

    selectTag(fastAddedTag);

    setSugs([fastAddedTag]);
  };

  const onCheckbtnCLick = () => {
    updateTag(newTag);
  };

  const tagColor = {
    color: newTag.color,
  };

  return (
    <>
      <label>Tag:</label>
      <div className="note-panel-primary-tag">
        <input
          type="text"
          style={tagColor}
          value={text}
          onFocus={onFocus}
          onChange={onChange}
        />
        <input type="button" value="✔️" onClick={onCheckbtnCLick} />
      </div>
      <div className="note-panel-tag-suggestions" tabIndex="0">
        {sugs.map((tag) => (
          <span
            key={tag._id}
            className="suggestion"
            style={{ color: tag.color }}
            onClick={() => selectTag(tag)}
          >
            #{tag.name}
          </span>
        ))}
        {sugs.length === 0 && (
          <span className="sugg-msg">
            no tags found, create <span onClick={onCreateTag}>{text}</span>
          </span>
        )}
      </div>
    </>
  );
};

console.log('proptypes');

export default connect(null, { addTag })(PrimaryTag);
