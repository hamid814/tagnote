import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

const Tag = ({tag}) => {
  const [theTag, setTheTag] = useState({})
  
  useEffect(() => {
    try {
      axios.get(`/api/v1/tags/${tag}`)
        .then(res => setTheTag(res.data.data))
    } catch (err) {
      console.log(err)
    }
    // eslint-disable-next-line
  }, [])
  
  const getTagColor = () => {
    return theTag.color
  }

  const background = {
    background: theTag ? theTag.color : 'initial'
  }
  
  return (
    <Link to={`${process.env.PUBLIC_URL}/tag/${tag}`} className='tag' style={background}>
      #{theTag && theTag.name}
    </Link>
  )
}

export default Tag
