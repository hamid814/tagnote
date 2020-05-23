import React, { useState } from 'react';

import checkValidation from 'utils/checkValidation';

import '../forms.scss';

const LoginForm = ({ action, message }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    const elem = e.target;

    const validation = checkValidation(
      e.target.dataset.validateType,
      e.target.name,
      e.target.value
    );

    if (e.target.value !== '') {
      if (validation.success) {
        elem.parentElement.classList.add('valid');
        elem.parentElement.classList.remove('invalid');
        elem.parentElement.classList.remove('empty');

        elem.parentElement.lastElementChild.innerText = validation.message;
      } else {
        elem.parentElement.classList.add('invalid');
        elem.parentElement.classList.remove('valid');
        elem.parentElement.classList.remove('empty');

        elem.parentElement.lastElementChild.innerText = validation.message;
      }
    } else {
      elem.parentElement.classList.add('empty');
      elem.parentElement.classList.remove('valid');
      elem.parentElement.classList.remove('invalid');

      elem.parentElement.lastElementChild.innerText = '';
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    action(formData);
  };

  const onLabelClick = (e) => {
    e.target.previousElementSibling.focus();
  };

  return (
    <form className="tagnote-form" onSubmit={onSubmit}>
      <div className="form-top">
        <div className="form-group">
          <input
            name="email"
            type="text"
            data-validate-type="email"
            value={formData.email}
            onChange={onChange}
          />
          <label onClick={onLabelClick}>Email</label>
          <div className="validation-success-emoji">
            <span role="img" aria-label="thumbs-up">
              👍
            </span>
          </div>
          <div className="validation-fail-emoji">
            <span role="img" aria-label="thumbs-down">
              👎
            </span>
          </div>
          <div className="form-group-message"></div>
        </div>
        <div className="form-group">
          <input
            name="password"
            data-validate-type="length-min-6"
            type="text"
            value={formData.password}
            onChange={onChange}
          />
          <label onClick={onLabelClick}>Password</label>
          <div className="validation-success-emoji">
            <span role="img" aria-label="thumbs-up">
              👍
            </span>
          </div>
          <div className="validation-fail-emoji">
            <span role="img" aria-label="thumbs-down">
              👎
            </span>
          </div>
          <div className="form-group-message"></div>
        </div>
      </div>
      <div className="form-bottom">
        <div className="form-message">{message}</div>
        <div className="form-group last">
          <input type="submit" value="🔐Login" />
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
