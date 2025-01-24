import React, { useState } from 'react';

export default function Signup() {
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    dob: '',
    gender: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Signup submitted', formData);
  };

  const tempStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  };

  return (
    <main className='signup'>
      <section className='signup-container'>
        <h1 className='signup-title'>Signup</h1>
        <form style={tempStyle} onSubmit={handleSubmit}>
          <label>
            First name
            <input
              type='text'
              className='form__text first-name'
              name='firstName'
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Middle name
            <input
              type='text'
              className='form__text middle-name'
              name='middleName'
              value={formData.middleName}
              onChange={handleChange}
            />
          </label>
          <label>
            Last name
            <input
              type='text'
              className='form__text last-name'
              name='lastName'
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Date of Birth
            <input
              type='date'
              className='form__date dob'
              name='dob'
              value={formData.dob}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Email
            <input
              type='email'
              className='form__text email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Password
            <input
              type='password'
              className='form__text password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>
          <input className='form__submit' type='submit' value='Sign Up' />
        </form>
      </section>
    </main>
  );
}
