import React from 'react'
import { Link } from 'react-router-dom';

const Tag = ({tag}) => {
  const background = {
    background: tag.color
  }
  
  return (
    <Link to={`${process.env.PUBLIC_URL}/tag/${tag._id}`} className='tag' style={background}>
      #{tag.name}
    </Link>
  )
}

export default Tag
