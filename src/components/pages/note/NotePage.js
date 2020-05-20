// modules
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// redux
import { selectNote } from 'store/actions/note';

// components
import BigNote from './BigNote';
import NotePanel from './NotePanel';

// style
import './style/notePage.scss';

const NotePage = ({ match, selectNote, note, loading }) => {
  useEffect(() => {
    selectNote(match.params.id);
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <>loading</>;
  } else {
    return (
      <div className="note-page">
        <Link className="dev-link" to={`${process.env.PUBLIC_URL}/`}>
          Home
        </Link>
        <div className="note-page-note-wrapper">
          <BigNote note={note} />
        </div>
        <div className="note-page-panel-wrapper">
          <NotePanel />
        </div>
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
