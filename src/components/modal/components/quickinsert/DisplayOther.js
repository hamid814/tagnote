import React from 'react'

const DisplayOther = ({ tags, setTags }) => {
  const deleteTag = tag => {
    const newList = tags.filter(t => {
      return t.id !== tag.id
    })

    setTags(newList)
  }
  
  return (
    <div className='insert-note-other'>
      {
        tags.map(tag => (
          <div key={tag.id} style={{background: tag.color}} onClick={() => deleteTag(tag)} className='insert-note-other-tag-item'>
            #{ tag.name }
            <div className='layer'>
              &times;
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default DisplayOther
