import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { selectNote } from 'store/actions/note';

import './notePage.scss';

const NotePage = ({ match, selectNote, note, loading }) => {
  useEffect(() => {
    selectNote(match.params.id);
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <>loading</>;
  } else {
    const date = moment(note.date, 'YYYY-MM-DD/hh:mm:ss');
    return (
      <div className="note-page">
        <Link className="dev-link" to={`${process.env.PUBLIC_URL}/`}>
          Home
        </Link>
        <div className="note-page-note">
          <div className="note-header">
            <div className="note-header-tag" style={{ color: note.tag.color }}>
              #{note.tag.name}
            </div>
            <div className="note-header-date">{date.format('YY / MM')}</div>
          </div>
          <div className="note-body">{note.body}</div>
          <div className="note-footer">
            <div className="note-other-notes">
              {note.otherTags.map((tag) => (
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
        <div className="note-page-panel">panel</div>
      </div>
    );
  }
};

NotePage.proptypes = {
  note: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  selectNote: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  note: state.note.note,
  loading: state.note.loading,
});

export default connect(mapStateToProps, { selectNote })(NotePage);
