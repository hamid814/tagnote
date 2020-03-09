import React from 'react'
import { Link } from 'react-router-dom';

const Tag = ({tag}) => {
  const getTagColor = () => {
    return tag.color
  }

  const background = {
    background: getTagColor()
  }
  
  return (
    <Link to={`${process.env.PUBLIC_URL}/tag/${tag.id}`} className='tag' style={background}>
      #{tag.name}
    </Link>
  )
}

export default Tag
