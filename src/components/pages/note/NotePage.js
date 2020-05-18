import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { selectNote } from 'store/actions/note';

const NotePage = ({ match, selectNote, note, loading }) => {
  console.log(loading);

  useEffect(() => {
    selectNote(match.params.id);
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <>loading</>;
  } else {
    return (
      <>
        <Link to={`${process.env.PUBLIC_URL}/`}>go to Home</Link>
        <br />
        <span style={{ color: note.tag.color }}>#{note.tag.name}</span>
        <br />
        {note.body}
        <br />
        {note.otherTags.map((tag) => (
          <span style={{ color: tag.color }}>{tag.name}</span>
        ))}
      </>
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
