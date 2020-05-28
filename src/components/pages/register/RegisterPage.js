import React, { useState } from 'react';
import { connect } from 'react-redux';

import { register } from 'store/actions/auth';

const RegisterPage = ({ register }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwrod2: '',
  });

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    register(formData);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" name="name" placeholder="name" onChange={onChange} />
        <br />
        <input
          type="text"
          name="email"
          placeholder="email"
          onChange={onChange}
        />
        <br />
        <input
          type="text"
          name="password"
          placeholder="passwrod"
          onChange={onChange}
        />
        <br />
        <input
          type="text"
          name="password"
          placeholder="Re-enter passwrod"
          onChange={onChange}
        />
        <br />
        <input type="submit" value="register" />
      </form>
    </div>
  );
};

export default connect(null, { register })(RegisterPage);
