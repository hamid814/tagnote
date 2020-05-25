import React from 'react';
import { Link } from 'react-router-dom';

const Tag = ({ tag, selecting }) => {
  const background = {
    color: tag.color,
  };

  return (
    <>
      {selecting ? (
        <div className="tag" style={background}>
          #{tag.name}
        </div>
      ) : (
        <Link
          to={`${process.env.PUBLIC_URL}/tags/${tag._id}`}
          className="tag"
          style={background}
        >
          #{tag.name}
        </Link>
      )}
    </>
  );
};

export default Tag;
