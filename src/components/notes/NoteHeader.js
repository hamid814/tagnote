import React from 'react'
import { Link } from 'react-router-dom';

const NoteHeader = ({ tag }) => {
  const getLink = () => {
    return `${process.env.PUBLIC_URL}/tag/${tag.id}`
  }
  
  const headerStyle = {
    color: tag.color
  }
  
  return (
    <Link to={getLink()} style={headerStyle}>
      #{ tag.name }
    </Link>
  )
}

export default NoteHeader
