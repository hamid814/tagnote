import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';

// redux
import { getNoteWithToken } from 'store/actions/note';

// styles
import './viewNote.scss';

const ViewNote = ({ match, getNoteWithToken, note }) => {
  console.log(note);

  useEffect(() => {
    getNoteWithToken(match.params.token);
    // eslint-disable-next-line
  }, []);

  const formattedDate =
    note.createdAt &&
    moment(note.createdAt, 'YYYY-MM-DD/hh:mm:ss').format('MM/YY');

  return (
    <div className="view-note-page">
      <div className="view-note-page-note">
        <div
          className="view-note-header"
          style={{ color: note.tag && note.tag.color }}
        >
          #{note.tag && note.tag.name}
        </div>
        <div className="view-note-body">{note.body}</div>
        <div className="view-note-footer">
          {note.otherTags &&
            note.otherTags.map((tag) => (
              <span key={tag.name} style={{ color: tag.color }}>
                #{tag.name}{' '}
              </span>
            ))}
        </div>
        <div className="view-note-credits">
          {note.user && 'note by: ' + note.user.name + ' at ' + formattedDate}
        </div>
      </div>
    </div>
  );
};

ViewNote.propTypes = {
  note: PropTypes.object,
  getNoteWithToken: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  note: state.note.note,
});

export default connect(mapStateToProps, { getNoteWithToken })(ViewNote);
