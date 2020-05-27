import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const NoteHeader = ({ tag, selecting }) => {
  const getLink = () => {
    return `${process.env.PUBLIC_URL}/tags/${tag.slug}`;
  };

  const onClick = (e) => {
    selecting && e.preventDefault();
    !selecting && e.stopPropagation();
  };

  const headerColor = {
    color: tag.color,
  };

  return (
    <Link
      to={getLink()}
      onClick={onClick}
      className="note-header-tag"
      style={headerColor}
    >
      #{tag.name}
    </Link>
  );
};

NoteHeader.propTypes = {
  tag: PropTypes.object.isRequired,
  _id: PropTypes.string.isRequired,
};

export default NoteHeader;
