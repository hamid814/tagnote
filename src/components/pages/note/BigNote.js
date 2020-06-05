// modules
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom';

const BigNote = ({ note: { body, tag, createdAt, otherTags }, goToEdit }) => {
  const formattedDate = moment(createdAt, 'YYYY-MM-DD/hh:mm:ss').format(
    'YY/MM'
  );

  return (
    <div className="note-page-note">
      <div className="note-header">
        <div className="note-header-tag" style={{ color: tag.color }}>
          #{tag.name}
        </div>
        <div className="note-header-date">{formattedDate}</div>
      </div>
      <pre className="note-body">{body}</pre>
      <div className="note-footer">
        <div className="note-other-notes">
          {otherTags.map((tag) => (
            <Link
              to={process.env.PUBLIC_URL + '/tags/' + tag.slug}
              key={tag._id}
              style={{ color: tag.color }}
            >
              #{tag.name}{' '}
            </Link>
          ))}
        </div>
      </div>
      <input
        type="button"
        value="✍️ Edit"
        className="edit-note-button"
        onClick={goToEdit}
      />
    </div>
  );
};

BigNote.propTypes = {
  note: PropTypes.object.isRequired,
};

export default BigNote;
