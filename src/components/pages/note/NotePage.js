// modules
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// compnents
import Loading from 'components/utils/loading/Loading';

// redux
import { selectNote } from 'store/actions/note';

// components
import BigNote from './BigNote';
import NotePanel from './NotePanel';

// style
import './style/notePage.scss';

const NotePage = ({ match, selectNote, note, loading }) => {
  const [pageState, setPageState] = useState('display'); // val: display, edit

  useEffect(() => {
    selectNote(match.params.id);
    // eslint-disable-next-line
  }, []);

  const toggleEdit = () => {
    pageState === 'edit' ? setPageState('display') : setPageState('edit');
  };

  if (loading) {
    return <Loading />;
  } else {
    return (
      <div className={`note-page ${pageState}`}>
        <div className="note-page-note-wrapper">
          <BigNote goToEdit={toggleEdit} note={note} />
        </div>
        <div className="note-page-panel-wrapper">
          <NotePanel goToDisplay={toggleEdit} note={note} />
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
