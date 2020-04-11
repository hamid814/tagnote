import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

const NotePage = ({ match }) => {
  const [loading, setLoading] = useState(true)
  const [note, setNote] = useState({})

  useEffect(() => {
    try {
      axios.get(`/api/v1/notes/${match.params.id}`)
        .then(res => {
          setNote(res.data.data)
          setLoading(false)
        })
    } catch (err) {
      console.log(err)
    }
    // eslint-disable-next-line
  }, [])
  
  if(loading) {
    return (
      <>
        loading
      </>
    )
  } else {
    return (
      <>
        <Link to={`${process.env.PUBLIC_URL}/`}>
          go to Home
        </Link>
        <br/>
        {
          note.body
        }
        <br/>
        {
          note.otherTags.map(tag => (
            tag.name
          ))
        }
        {
          console.log(note)
        }
      </>
    )
  }
}

export default NotePage
