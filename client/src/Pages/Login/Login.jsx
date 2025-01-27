import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Form from '../../components/ui/Form';

function Login() {
  const { signIn } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signIn(formData.email, formData.password);
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };

  const fields = [
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
    <main className='login'>
      <section className='login-container'>
        <h1 className='login-title'>Login</h1>
        <Form
          fields={fields}
          values={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
          submitText='Login'
          showSocialLogin={true}
        />
      </section>
    </main>
  );
}

export default Login;
