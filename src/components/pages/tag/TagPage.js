import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { getTagWithNotes } from 'store/actions/tag';

import Notes from '../../notes/Notes';

import './tagpage.scss';

const TagPage = ({
  match,
  tag,
  notes,
  otherNotes,
  getTagWithNotes,
  loading,
}) => {
  const { slug } = match.params;

  const [waiting, setWaiting] = useState(true);

  useEffect(() => {
    asyncEffect();
    // eslint-disable-next-line
  }, [slug]);

  const asyncEffect = async () => {
    await getTagWithNotes(slug);
    setWaiting(false);
  };

  const tagColor = {
    color: tag.color,
  };

  if (loading) {
    return <>loading</>;
  } else
    return (
      <div className="tag-page">
        <Link to={`${process.env.PUBLIC_URL}/`}>go home</Link>
        <h1 style={tagColor} className="tag-name">
          #{tag.name}
        </h1>
        {!waiting && <Notes notes={notes} />}
        {otherNotes.length > 0 && (
          <>
            <div
              className="others-line"
              style={{ background: tag.color }}
            ></div>
            <h3 className="other-tags-title">Related Notes</h3>
            {!waiting && <Notes notes={otherNotes} />}
          </>
        )}
      </div>
    );
};

TagPage.propTypes = {
  tag: PropTypes.object.isRequired,
  notes: PropTypes.array,
  otherNotes: PropTypes.array,
  getTagWithNotes: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  tag: state.tag.tag,
  notes: state.tag.notes,
  otherNotes: state.tag.otherNotes,
  loading: state.tag.loading,
});

export default connect(mapStateToProps, { getTagWithNotes })(TagPage);
