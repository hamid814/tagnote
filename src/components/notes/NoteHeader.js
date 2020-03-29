import React from 'react'
import { Link } from 'react-router-dom';

const NoteHeader = ({ tag, _id }) => {
  const getLink = () => {
    const tagLink = `${process.env.PUBLIC_URL}/tag/${tag._id}`
    const noteLink = `${process.env.PUBLIC_URL}/note/${_id}`
    
    return {
      tag: tagLink,
      note: noteLink
    }
  }
  
  const headerStyle = {
    color: tag.color
  }

  const buttonStyle = {
    background: tag.color
  }
  
  return (
    <>
      <Link to={getLink().tag} className='note-header-tag' style={headerStyle}>
        #{ tag.name }
      </Link>
      <Link to={getLink().note} className='note-header-button' style={buttonStyle}>
        
      </Link>
    </>
  )
}

export default NoteHeader
