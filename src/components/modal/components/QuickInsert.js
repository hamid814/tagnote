import React from 'react';
import InsertColor from './InsertColor';
import InsertTag from './InsertTag';
import './quickinsert.scss';

const QuickInsert = () => {
  return (
    <div className='quick-insert-modal'>
      <div className='insert-section left'>
        <div className='section-head'>
          Note
        </div>
      </div>
      <div className='insert-section right'>
        <div>
          <div className='section-head'>
            tag
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
