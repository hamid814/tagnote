// modules
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom';

const BigNote = ({ note: { body, tag, date, otherTags } }) => {
  const formattedDate = moment(date, 'YYYY-MM-DD/hh:mm:ss').format('YY/MM');

  return (
    <div className="note-page-note">
      <div className="note-header">
        <div className="note-header-tag" style={{ color: tag.color }}>
          #{tag.name}
        </div>
        <div className="note-header-date">{formattedDate}</div>
      </div>
      <div className="note-body">{body}</div>
      <div className="note-footer">
        <div className="note-other-notes">
          {otherTags.map((tag) => (
            <Link
              to={process.env.PUBLIC_URL + '/tags/' + tag._id}
              key={tag._id}
              style={{ color: tag.color }}
            >
              #{tag.name}{' '}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

BigNote.propTypes = {
  note: PropTypes.object.isRequired,
};

export default BigNote;
