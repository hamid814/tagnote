import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getTag } from 'store/actions/tag';

import Notes from '../../notes/Notes';

import './tagpage.scss';

const TagPage = ({ match, tag, notes, getTag, loading }) => {
  const { id } = match.params;

  useEffect(() => {
    getTag(id);
    // eslint-disable-next-line
  }, []);

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
        {notes.primaryList && notes.primaryList.length > 0 && (
          <Notes notes={notes.primaryList} />
        )}
        other Notes
        {notes.otherList && notes.otherList.length > 0 && (
          <Notes notes={notes.otherList} />
        )}
      </div>
    );
};

console.log('proptypes');

const mapStateToProps = (state) => ({
  tag: state.tag.tag,
  notes: state.tag.notes,
  relatedNotes: state.tag.relatedNotes,
  loading: state.tag.loading,
});

export default connect(mapStateToProps, { getTag })(TagPage);
