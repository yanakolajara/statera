import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Form from '../../components/ui/Form';
import { SIGNUP_FIELDS } from '../../constants/formFields';

export default function Signup() {
  const { signUp } = useAuth();
  const [formData, setFormData] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    dob: '',
    gender: '',
    email: '',
    phone: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await signUp(formData.email, formData.password, {
        first_name: formData.first_name,
        middle_name: formData.middle_name,
        last_name: formData.last_name,
        email: formData.email,
        phone: formData.phone,
        dob: formData.dob,
        gender: formData.gender,
      });

      if (result.success) {
        alert(
          'A verification link has been sent to your email. Please verify your account before logging in.'
        );
        navigate('/login');
      } else {
        alert(result.error);
      }
    } catch (error) {
      // This will only run if there's an unexpected error
      alert('An unexpected error occurred. Please try again later.');
    }
  };

  const fields = [
    {
      type: 'text',
      name: 'first_name',
      label: 'First name',
      placeholder: 'Enter your first name',
      required: true,
    },
    {
      type: 'text',
      name: 'middle_name',
      label: 'Middle name',
      placeholder: 'Enter your middle name',
      required: false,
    },
    {
      type: 'text',
      name: 'last_name',
      label: 'Last name',
      placeholder: 'Enter your last name',
      required: true,
    },
    {
      type: 'date',
      name: 'dob',
      label: 'Date of Birth',
      required: true,
    },
    {
      type: 'text',
      name: 'phone',
      label: 'Phone',
      placeholder: 'Enter your phone number',
      required: true,
    },
    {
      type: 'email',
      name: 'email',
      label: 'Email',
      placeholder: 'Enter your email',
      required: true,
    },
    {
      type: 'password',
      name: 'password',
      label: 'Password',
      placeholder: 'Enter your password',
      required: true,
    },
  ];

  return (
    <main className='signup'>
      <section className='signup-container'>
        <h1 className='signup-title'>Signup</h1>
        <Form
          fields={SIGNUP_FIELDS}
          values={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
          submitText='Sign Up'
          showSocialLogin={true}
        />
      </section>
    </main>
  );
}
