import React, { useState, useContext } from 'react'
import axios from 'axios';
import './insertnote.scss';

import { AlertContext } from '../../../context/alert/AlertState';

const InsertNote = () => {
  const { setAlert } = useContext(AlertContext)
  
  const [text, setText] = useState('')
  const [tag, setTag] = useState('')
  const [tags, setTags] = useState([])
  const [addingTag, setAddingTag] = useState(false)
  const [selectedTag, setSelectedTag] = useState({})
  const [selectTagStep, setSelectTagStep] = useState(0)
  
  const onTextChange = e => {
    setText(e.target.value)
  }

  const onTagChange = e => {
    const value = e.target.value
    
    setTag(e.target.value)
    axios.get(`/tags/search?text=${e.target.value}`)
      .then(res => {
        setTags(res.data)
        if(res.data.length === 1 && res.data[0]) {
          if(res.data[0].name === value) {
            setSelectedTag(res.data[0])
            setAddingTag(false)
          } else {
            setSelectedTag({})
          }
        } else {
          setSelectedTag({})
        }
      })

    e.target.value !== '' && setAddingTag(true)

    setSelectTagStep(0)
  }

  const onTagFocus = e => {
    tag !== '' && setAddingTag(true)
  }

  const onTagBlur = e => {
    setAddingTag(false)
    tag === '' && setSelectedTag({})
    setSelectTagStep(0)
  }

  const onTagKeyUp = e => {
    e.preventDefault()
    if(e.keyCode === 40) {
      // arrow down pushed
      selectTagStep !== tags.length
        && setSelectTagStep(selectTagStep + 1)
    } else if(e.keyCode === 38) {
      // arrow up pushed
      selectTagStep !== 0
        && setSelectTagStep(selectTagStep - 1)
    } else if(e.keyCode === 13) {
      if(tags.length !== 0) {
        if(tags[selectTagStep - 1]) {
          selectTag(tags[selectTagStep - 1])
        }
      } else if(tags.length === 0 && tag !== '') {
        console.log('here')
      }
    }
  }
  
  const selectTag = tag => {
    setTag(tag.name)
    setSelectedTag(tag)
    setAddingTag(false)
    setSelectTagStep(0)
  }

  const createTag = () => {
    try {
      axios.post('/tags', {
        name: tag
      })
        .then(res => {
          setAlert('on', `tag ${res.data.name} created`, 'success', 2500)
          setAddingTag(false)
          setSelectedTag(res.data)
        })
    } catch (err) {
      
    }
  }

  const onAddNote = () => {
    if(selectedTag.id && text) {
      try {
        axios.post('/notes', {
          text,
          tags: {
            primary: selectedTag.id,
            other: []
          },
          date: new Date()
        })
          .then(res => {
            setTag('')
            setText('')
            setSelectedTag({})
            setTags([])
            setAlert('on', 'Note added', 'success', 3500)
          })
      } catch (err) {
        console.log(err)
      }
    } else {
      if(text === '') {
        setAlert('on', 'note text is required', 'warning', 2500)
      } else if(!selectedTag.id) {
        setAlert('on', 'you must select or create a tag', 'warning', 2500)
      }
    }
  }

  const tagBorderColor = {
    borderColor: selectedTag.color ? selectedTag.color : '#ccc',
  }

  const tagColor = {
    color: selectedTag.color ? selectedTag.color : '#ccc'
  }
  
  return (
    <div className='insert-note'>
      <div onBlur={onTagBlur} onFocus={onTagFocus} style={tagBorderColor} className='insert-note-tag' tabIndex='-1'>
        <span style={tagColor}>#</span>
        <input
          type='text'
          placeholder='Tag'
          style={tagColor}
          value={tag}
          onKeyUp={onTagKeyUp}
          onChange={onTagChange}/>
        <div className={`insert-note-tag-sug ${addingTag ? 'show' : 'hide'}`}>
          {
            tags.length !== 0
              && <TagsDisplayer step={selectTagStep} tags={tags} select={selectTag} />
          }
          {
            tag !== ''
              && <AddTag createTag={createTag} text={tag} />
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
      /other hashtags
      <input type='submit' value='Add Note' className='insert-note-button' onClick={onAddNote}/>
    </div>
  )
}

const TagsDisplayer = ({ tags, step, select }) => {
  const onClick = tag => {
    select(tag)
  }
  
  return (
    <>
      {
        tags.map((tag, index) => (
          <div
            key={tag.id}
            className={`tag-suggestion ${index + 1 === step && 'active'}`}
            onClick={() => onClick(tag)}
            style={{background: tag.color}}>
            { tag.name }
          </div>
        ))
      }
    </>
  )
}

const AddTag = ({ text, createTag }) => {
  return (
    <div>
      create <div onClick={() => createTag()} className='tag-suggestion create-tag'>{ text }</div>
    </div>
  )
}

export default InsertNote
