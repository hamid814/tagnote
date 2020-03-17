import React from 'react'

const Note = ({ match }) => {
  console.log(match.params.id)
  
  return (
    <div>
      from note page
    </div>
  )
}

export default Note
