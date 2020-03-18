import React, { useState } from 'react'
import axios from 'axios';

const AddOther = ({ tags, primaryTagId, setTags }) => {
  const [text, setText] = useState('')
  const [tag, setTag] = useState({})

  const onChange = e => {
    const value = e.target.value
    
    setText(e.target.value)
    axios.get(`/tags/search?text=${value}`)
      .then(res => {
        if(res.data.length !== 0 && value !== '') {
          if(res.data.length === 1) {
            // only one tag is responsed
            setTag(res.data[0])
          } else {
            // several tags responsed => get the one with exact same name
            let index = 0;
            while(res.data[index] && tags.map(t=>t.id).indexOf(res.data[index].id) === -1) {
              setTag(res.data[index])
              index++;
            }
          }
        }
        
        // clear state if nothing returned form server
        res.data.length === 0 && setTag({})
      })

    if(value === '') {
      setTag({})
    }
  }

  const onKeyUp = e => {
    if(e.keyCode === 39 || e.keyCode === 13) {
      // arrow right pushed
      addTag()
    }
  }
  
  const addTag = () => {
    if(tag.id) {
      if(tags.map(t=>t.id).indexOf(tag.id) === -1) {
        if(tag.id !== primaryTagId) {
          const newList = [...tags, tag]
          setTags(newList)
        }
      }
    }

    setText('')
    setTag({})
  }
  
  const bg = {
    background: tag.color ? tag.color : 'transparent'
  }

  return (
    <div className='add-note-other-input'>
      <div>
        #
        <input type='text' onKeyUp={onKeyUp} value={text} placeholder='other tag' onChange={onChange}/>
      </div>
      <div className='other-tag-sug' style={bg} onClick={addTag}>
        { tag.name ? tag.name : text !== '' && 'Not Found' }
      </div>
    </div>
  )
}

export default AddOther
