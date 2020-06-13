import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Notes from '../../notes/Notes';

import { getNotes } from 'store/actions/note';

import './home.scss';

const Home = ({ notes, getNotes }) => {
  const [waiting, setWaiting] = useState(true);

  useEffect(() => {
    asyncEffect();
    // eslint-disable-next-line
  }, []);

  const asyncEffect = async () => {
    await getNotes();
    setWaiting(false);
  };

  return <div className="home-page">{!waiting && <Notes notes={notes} />}</div>;
};

Home.propTypes = {
  getNotes: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  notes: state.note.notes,
});

export default connect(mapStateToProps, { getNotes })(Home);
