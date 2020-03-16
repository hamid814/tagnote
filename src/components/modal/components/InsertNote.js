import React, { useState } from 'react'
import axios from 'axios';
import './insertnote.scss';

const InsertNote = () => {
  const [text, setText] = useState('')
  const [tag, setTag] = useState('')
  const [tags, setTags] = useState([])
  const [addingTag, setAddingTag] = useState(false)
  const [selectedTag, setSelectedTag] = useState({})
  
  const onTextChange = e => {
    setText(e.target.value)
  }

  const onTagChange = e => {
    setTag(e.target.value)
    axios.get(`/tags/search?text=${e.target.value}`)
      .then(res => setTags(res.data))
  }

  const onTagFocus = e => {
    setAddingTag(true)
  }

  const onTagBlur = e => {
    setAddingTag(false)
  }
  
  const selectTag = tag => {
    setTag(tag.name)
    setSelectedTag(tag)
    setAddingTag(false)
  }

  const onAddNote = () => {
    axios.post('/notes', {
      text,
      tags: {
        primary: selectedTag.id,
        other: []
      },
      date: new Date()
    })
      .then(res => console.log(res.data))
  }
  
  return (
    <div className='insert-note'>
      <div onBlur={onTagBlur} onFocus={onTagFocus} className='insert-note-tag' tabIndex='-1'>
        <span>#</span>
        <input
          type='text'
          placeholder='Tag'
          value={tag}
          onChange={onTagChange}/>
        <div className={`insert-note-tag-sug ${addingTag ? 'show' : 'hide'}`}>
          {
            tags.map(tag => (
              <TagDisplayer key={tag.id} tag={tag} select={selectTag} />
            ))
          }
        </div>
      </div>
      <textarea
        className='insert-note-text'
        value={text}
        onChange={onTextChange}
        placeholder='Note...'
        rows='6'>
      </textarea>
      <br/>
      /other hashtags
      <input type='submit' value='Add Note' onClick={onAddNote}/>
    </div>
  )
}

const TagDisplayer = ({ tag, select }) => {
  const onClick = () => {
    select(tag)
  }
  
  const bg = {
    background: tag.color
  }
  
  return (
    <div onClick={onClick} style={bg} className='tag-suggestion'>
      { tag.name }
    </div>
  )
}

export default InsertNote
