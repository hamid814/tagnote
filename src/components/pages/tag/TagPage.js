import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';

import Notes from '../../notes/Notes';

import './tagpage.scss';

const TagPage = ({ match }) => {
  const { id } = match.params

  const [tag, setTag] = useState({})
  const [notes, setNotes] = useState([])
  
  useEffect(() => {
    axios.get(`/tags/${id}`)
      .then(res => setTag(res.data))

    axios.get(`/notes/tag/${id}`)
      .then(res => setNotes(res.data))
    // eslint-disable-next-line
  }, [])
  
  const tagColor = {
    color: tag.color
  }
  
  return (
    <div className='tag-page'>
      <Link to={`${process.env.PUBLIC_URL}/`}>
        go home
      </Link>
    
      <h1 style={tagColor} className='tag-name'>
        #{ tag.name }
      </h1>

      {
        notes.length > 0 &&
          <Notes notes={notes} />
      }
    </div>
  )
}

export default TagPage
