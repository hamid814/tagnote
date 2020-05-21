import React from 'react';
// eslint-disable-next-line
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { deleteTag } from 'store/actions/tag';

const HomeTags = ({ tags, deleteTag }) => {
  return (
    <div className="home-tags-container">
      {tags.map((tag) => (
        <Tag key={tag._id} tag={tag} deleteTag={deleteTag} />
      ))}
    </div>
  );
};

const Tag = ({ tag, deleteTag }) => {
  // eslint-disable-next-line
  const getLink = () => {
    return `${process.env.PUBLIC_URL}/tags/${tag._id}`;
  };

  const onClick = () => deleteTag(tag._id, tag.name);

  const style = {
    background: tag.color,
    fontSize: '130%',
    marginRight: 15,
    padding: '4px 12px',
    borderRadius: 7,
    color: '#333',
  };

  return (
    <span style={style}>
      {/* <Link to={getLink} style={style}> */}#{tag.name}
      <span className="delete-tag-btn" onClick={onClick}>
        &times;
      </span>
      {/* </Link> */}
    </span>
  );
};

export default connect(null, { deleteTag })(HomeTags);
