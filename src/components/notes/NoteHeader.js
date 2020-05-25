import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const NoteHeader = ({ tag, _id }) => {
  const getLink = () => {
    const tagLink = `${process.env.PUBLIC_URL}/tags/${tag._id}`;
    const noteLink = `${process.env.PUBLIC_URL}/notes/${_id}`;

    return {
      tag: tagLink,
      note: noteLink,
    };
  };

  const headerStyle = {
    color: tag.color,
  };

  return (
    <>
      <Link to={getLink().tag} className="note-header-tag" style={headerStyle}>
        #{tag.name}
      </Link>
    </>
  );
};

NoteHeader.propTypes = {
  tag: PropTypes.object.isRequired,
  _id: PropTypes.string.isRequired,
};

export default NoteHeader;
