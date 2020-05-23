import React, { useState } from 'react';
import axios from 'axios';

const OtherTags = ({ edit, tags, primaryTag }) => {
  const [newTagText, setNewTagText] = useState('');
  const [tag, setTag] = useState({});

  const onDeleteTagClick = (tag) => {
    edit({
      otherTags: tags.filter((t) => t._id !== tag._id),
    });
  };

  const onChange = async (e) => {
    setNewTagText(e.target.value);

    const value = e.target.value.toLowerCase();

    if (value !== '') {
      const res = await axios.get(`/api/v1/tags?find=${value}`);

      const resTags = res.data.data;

      const tagsIds = tags.map((tag) => tag._id);

      const filtered = resTags.filter((tag) => tagsIds.indexOf(tag._id) === -1);

      const resWithoutPrimaryTag = filtered.filter(
        (tag) => tag._id !== primaryTag._id
      );

      resWithoutPrimaryTag[0] && setTag(resWithoutPrimaryTag[0]);
    } else {
      setTag({});
    }
  };

  const onKeyUp = (e) => {
    if (e.keyCode === 13 && tag.name) {
      onAddOtherTag();
    }
  };

  const onAddOtherTag = () => {
    edit({
      otherTags: [...tags, tag],
    });

    setTag({});

    setNewTagText('');
  };

  const getColor = tag.color
    ? {
        color: tag.color,
        borderColor: '#ccc',
      }
    : {
        color: 'inherit',
        borderColor: 'transparent',
      };

  return (
    <>
      <label>Other Tags:</label>
      {tags.length > 0 && (
        <div className="note-panel-other-tags">
          {tags.map((tag) => (
            <span
              className="note-panel-other-tag-item"
              key={tag._id}
              style={{ color: tag.color }}
            >
              {tag.name}

              <span
                className="other-tag-item-delete-btn"
                onClick={() => onDeleteTagClick(tag)}
              >
                &times;
              </span>
            </span>
          ))}
        </div>
      )}
      <div className="note-panel-add-other-tag">
        <input
          type="text"
          value={newTagText}
          onChange={onChange}
          onKeyUp={onKeyUp}
          placeholder="Add another tag..."
          className="other-tags-input"
        />
        <div className="other-tag-sug" style={getColor} onClick={onAddOtherTag}>
          {tag.name ? tag.name : 'Not found'}
        </div>
      </div>
    </>
  );
};

export default OtherTags;
