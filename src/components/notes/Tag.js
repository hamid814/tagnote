import React from 'react';
import { Link } from 'react-router-dom';

const Tag = ({ tag, selecting }) => {
  const background = {
    color: tag.color,
  };

  const onClick = (e) => {
    selecting ? e.preventDefault() : e.stopPropagation();
  };

  return (
    <Link
      onClick={onClick}
      to={`${process.env.PUBLIC_URL}/tags/${tag.slug}`}
      className="tag"
      style={background}
    >
      #{tag.name}
    </Link>
  );
};

export default Tag;
