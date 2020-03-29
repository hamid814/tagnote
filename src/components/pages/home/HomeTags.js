import React from 'react'
import { Link } from 'react-router-dom';

const HomeTags = ({ tags }) => {
  return (
    <div className='home-tags-container'>
      {
        tags.map(tag => (
          <Tag key={tag._id} tag={tag} />
        ))
      }
    </div>
  )
}

const Tag = ({ tag }) => {
  const getLink = () => {
    return `${process.env.PUBLIC_URL}/tag/${tag._id}`
  }
  
  const style = {
    background: tag.color,
    fontSize: '130%',
    marginRight: 15,
    padding: '4px 12px',
    borderRadius: 9999,
    color: '#333',
  }
  
  return (
    <Link to={getLink} style={style}>
      #{ tag.name }
    </Link>
  )
}

export default HomeTags