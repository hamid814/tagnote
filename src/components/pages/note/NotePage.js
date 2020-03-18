import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

const NotePage = ({ match }) => {
  const [note, setNote] = useState({})

  useEffect(() => {
    try {
      axios.get(`/notes/id/${match.params.id}`)
        .then(res => setNote(res.data))
    } catch (err) {
      console.log(err)
    }
    // eslint-disable-next-line
  }, [])
  
  return ( 
    <>
      <Link to={`${process.env.PUBLIC_URL}/`}>
        go to Home
      </Link>
      <br/>
      {
        note.text
      }
    </>
  )
}

export default NotePage
