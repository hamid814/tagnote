import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';

import './tag.scss';

const Tag = ({ match }) => {
  const { id } = match.params

  const [tag, setTag] = useState({})
  
  useEffect(() => {
    axios.get(`/tag/${id}`)
      .then(res => setTag(res.data))

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
    </div>
  )
}

export default Tag
