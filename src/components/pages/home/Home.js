import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Notes from '../../notes/Notes';

const Home = () => {
  const [notes, setNotes] = useState([])

  useEffect(() => {
    try {
      axios.get('/notes')
        .then(res => setNotes(res.data))

    } catch (error) {
      console.log(error)
    }
    // eslint-disable-next-line
  }, [])
  
  return (
    <div>
      <br/>
      <Notes notes={notes} />
    </div>
  )
}

export default Home
