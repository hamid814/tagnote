import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

//redux
import { closeOptions } from 'store/actions/options';
import { setAlert } from 'store/actions/alert';

// utilities
import getList from './lists';
import functions from './functions';

// style
import './options.scss';

const Options = ({ status, data, closeOptions, setAlert }) => {
  const [optionsClass, setOptionsClass] = useState('first-close');

  useEffect(() => {
    if (status === 'open') {
      setOptionsClass('opening');

      setTimeout(() => {
        setOptionsClass('open');
      }, 180);
    } else if (status === 'close') {
      setOptionsClass('closing');

      setTimeout(() => {
        setOptionsClass('close');
      }, 180);
    } else if (status === 'first-close') {
      setOptionsClass('close');
    }
  }, [status]);

  const onClick = (e) => {
    if (e.target.classList.contains('options-container')) {
      closeOptions();
    }
  };

  const { subject, context } = data;

  const getFunction = (arg) => {
    if (typeof arg === 'function') {
      arg();
    } else if (typeof arg === 'string') {
      if (typeof functions[arg] === 'function') {
        functions[arg](context);
      } else {
        setAlert(
          'on',
          'some error accured \nthe error is sent to our server and will be addressed ASAP',
          'warning',
          4000
        );
      }
    } else {
      console.log('action not supprted');
    }
  };

  const { title, options } = getList(subject, context);

  return (
    <div className={`options-container ${optionsClass}`} onClick={onClick}>
      <div className="options-body">
        <div className="options-title">{title}</div>
        <ul className="options-list">
          {options.map((item) => (
            <li
              key={item.id}
              onClick={() => getFunction(item.action)}
              className={`option-item ${item.addedClassName}`}
            >
              {item.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

console.log('resort acitons');
Options.propTypes = {
  status: PropTypes.string.isRequired,
  data: PropTypes.object,
  closeOptions: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  status: state.options.status,
  data: state.options.data,
});

export default connect(mapStateToProps, { closeOptions, setAlert })(Options);
