import React, { useState } from 'react';

import '../forms.scss';

const LoginForm = ({ action, message }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

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
            value={formData.email}
            onChange={onChange}
          />
          <label onClick={onLabelClick}>Email:</label>
        </div>
        <div className="form-group">
          <input
            name="password"
            type="text"
            value={formData.password}
            onChange={onChange}
          />
          <label onClick={onLabelClick}>Password:</label>
        </div>
      </div>
      <div className="form-bottom">
        <div className="form-group">
          <input type="submit" value="🔐Login" />
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
