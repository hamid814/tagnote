import React from 'react'
import Note from '../../notes/Note';

const Home = () => {
  const note = {
    id: 'note_id_1',
    tags: {
      first: {
        id: 'tag_id_1',
        name: 'story',
        color: '#eeb82c'
      },
      other: [
        {
          id: 'tag_id_2',
          name: 'techy',
          color: '#04bca4'
        },
      ]
    },
    text: 'text',
    date: 'date'
  }
  
  return (
    <div>
      form Home js
      <br/>
      <Note note={note} />
    </div>
  )
}

export default Home
