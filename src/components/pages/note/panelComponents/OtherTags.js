import React from 'react';

const OtherTags = ({ edit, tags }) => {
  const onDeleteTagClick = (tag) => {
    edit({
      otherTags: tags.filter((t) => t._id !== tag._id),
    });
  };

  return (
    <>
      <label>Other Tags:</label>
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
      <div>
        <input
          type="text"
          placeholder="Add another tag..."
          className="other-tags-input"
        />
      </div>
    </>
  );
};

export default OtherTags;
