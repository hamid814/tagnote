import React from 'react';
import InsertNote from './InsertNote';
import InsertTag from './InsertTag';
import InsertColor from './InsertColor';
import './quickinsert.scss';

const QuickInsert = () => {
  return (
    <div className='quick-insert-modal'>
      <div className='insert-section left'>
        <div className='section-head'>
          Note
        </div>
        <div className="section-body">
          <InsertNote />
        </div>
      </div>
      <div className='insert-section right'>
        <div>
          <div className='section-head'>
            Tag
          </div>
          <div className='section-body'>
            <InsertTag />
          </div>
        </div>
        <div>
          <div className='section-head'>
            color
          </div>
          <div className='section-body'>
            <InsertColor />
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuickInsert
