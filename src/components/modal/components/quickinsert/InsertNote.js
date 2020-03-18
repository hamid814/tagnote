import React, { useState, useContext } from 'react'
import axios from 'axios';
import AddOther from './AddOther';
import DisplayOther from './DisplayOther';
import './insertnote.scss';

import { AlertContext } from '../../../../context/alert/AlertState';

const InsertNote = () => {
  const { setAlert } = useContext(AlertContext)
  
  const [text, setText] = useState('')
  const [tag, setTag] = useState('')
  const [tags, setTags] = useState([])
  const [addingTag, setAddingTag] = useState(false)
  const [selectedTag, setSelectedTag] = useState({})
  const [selectTagStep, setSelectTagStep] = useState(0)
  const [otherTags, setOtherTags] = useState([])
  const [otherTagsIds, setOtherTagsIds] = useState([])
  
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
          // only one tag responsed
          if(res.data[0].name === value) {
            selectTag(res.data[0], true)
          } else {
            setSelectedTag({})
          }
        } else if(res.data.length > 1) {
          // several tags responsed
          if(res.data.map(tag => tag.name).indexOf(value) !== -1) {
            if(res.data[res.data.map(tag => tag.name).indexOf(value)].name === value) {
              // the text is exactly same as tags name
              selectTag(res.data[res.data.map(tag => tag.name).indexOf(value)])
            }
          } else {
            setSelectedTag({})
          }
        } else if(res.data.length === 0) {
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
      selectTagStep < tags.length
        && setSelectTagStep(selectTagStep + 1)
    } else if(e.keyCode === 38) {
      // arrow up pushed
      selectTagStep !== 0
        && setSelectTagStep(selectTagStep - 1)
    } else if(e.keyCode === 39) {
      // arrow right pushed
      if(tags.length === 1) {
        selectTag(tags[0], true)
      }
    } else if(e.keyCode === 13) {
      if(tags.length !== 0) {
        if(tags[selectTagStep - 1]) {
          selectTag(tags[selectTagStep - 1], true)
        }
      } else if(tags.length === 0 && tag !== '') {
        createTag()
      }
      if(selectedTag.id) {
        selectTag(selectedTag, true)
      }
    }
  }
  
  const selectTag = (tag, clearAddingTag/* T or F */) => {
    setTag(tag.name)
    setSelectedTag(tag)
    clearAddingTag && setAddingTag(false)
    setSelectTagStep(0)

    if(otherTagsIds.indexOf(tag.id) !== -1) {
      // the tag is in other Tags list so delete it...
      const newList = otherTags.filter(t => {
        return t.id !== tag.id
      })

      setOther(newList)
    }
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
      console.log(err)
    }
  }

  const setOther = tags => {
    setOtherTags(tags)
    
    const ids = tags.map(t => t.id)
    
    setOtherTagsIds(ids)
  }

  const onAddNote = () => {
    if(selectedTag.id && text) {
      try {
        axios.post('/notes', {
          text,
          tags: {
            primary: selectedTag.id,
            other: otherTagsIds
          },
          date: new Date()
        })
          .then(res => {
            setTag('')
            setText('')
            setSelectedTag({})
            setTags([])
            setOtherTags([])
            setOtherTagsIds([])
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
            tag !== '' && tags.map(tag => tag.name).indexOf(tag) === -1
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
      <AddOther setTags={setOther} tags={otherTags} primaryTagId={selectedTag.id} />
      <DisplayOther setTags={setOther} tags={otherTags} />
      <input type='submit' value='Add Note' className='insert-note-button' onClick={onAddNote}/>
    </div>
  )
}

const TagsDisplayer = ({ tags, step, select }) => {
  const onClick = tag => {
    select(tag, true)
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