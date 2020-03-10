import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Notes from '../../notes/Notes';
import HomeTags from './HomeTags';

import './home.scss';

const Home = () => {
  const [notes, setNotes] = useState([])
  const [tags, setTags] = useState([])

  useEffect(() => {
    try {
      axios.get('/notes')
        .then(res => setNotes(res.data))

    } catch (error) {
      console.log(error)
    }

    try {
      axios.get('/tags')
        .then(res => setTags(res.data))
    } catch (err) {
      console.log(err)
    }
    // eslint-disable-next-line
  }, [])
  
  return (
    <div>
      <HomeTags tags={tags} />
      <br/>
      <Notes notes={notes} />
    </div>
  )
}

export default Home
