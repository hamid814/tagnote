import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import Notes from '../../notes/Notes';
import HomeTags from './HomeTags';

import { getNotes } from 'store/actions/note';

import './home.scss';

const Home = ({ notes, getNotes }) => {
  const [waiting, setWaiting] = useState(true);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    asyncEffect();

    try {
      axios.get('/api/v1/tags').then((res) => setTags(res.data.data));
    } catch (err) {
      console.log(err);
    }
    // eslint-disable-next-line
  }, []);

  const asyncEffect = async () => {
    await getNotes();
    setWaiting(false);
  };

  return (
    <div className="home-page">
      <HomeTags tags={tags} />
      <br />
      {!waiting && <Notes notes={notes} />}
    </div>
  );
};

Home.propTypes = {
  getNotes: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  notes: state.note.notes,
});

export default connect(mapStateToProps, { getNotes })(Home);
