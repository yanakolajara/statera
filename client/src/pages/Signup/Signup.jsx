import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Form from '../../components/ui/Form';
import { SIGNUP_FIELDS } from '../../constants/formFields';

export default function Signup() {
  const { signUp, setSaveEmail, completeEnrollment } = useAuth();
  const [renderVerification, setRenderVerification] = useState(false);
  const [code, setCode] = useState('');
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
    setSaveEmail(formData.data);
    e.preventDefault();
    console.log(formData.email, formData.password);
    console.log({
      first_name: formData.first_name,
      middle_name: formData.middle_name,
      last_name: formData.last_name,
      email: formData.email,
      phone: formData.phone,
      dob: formData.dob,
      gender: formData.gender,
    });
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
        setRenderVerification(true);
      } else {
        alert(result.error);
      }
    } catch (error) {
      console.log('🚀 ~ handleSubmit ~ error:', error);

      alert('An unexpected error occurred. Please try again later.');
    }
  };

  const handleVerification = async (e) => {
    e.preventDefault();
    try {
      const result = await completeEnrollment(formData.email, code);
      console.log('🚀 ~ handleVerification ~ result:', result);

      if (result.success) {
        alert(result.message);
        navigate('/');
      } else {
        console.log('TESTESTES', result);
        alert(result.error);
      }
    } catch (error) {
      console.log('fesadfdsaf', error);
      alert('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <main className='signup'>
      <section className='signup-container'>
        <h1 className='signup-title'>Signup</h1>
        {renderVerification ? (
          <div>
            <form onSubmit={handleVerification}>
              <p>Verification code sent to your email</p>
              <input
                name='code'
                value={code}
                onChange={(e) => setCode(e.target.value)}
                type='text'
                placeholder='Enter verification code'
              />

              <input type='submit' value='' />
            </form>
          </div>
        ) : (
          <Form
            fields={SIGNUP_FIELDS}
            values={formData}
            onChange={handleChange}
            onSubmit={handleSubmit}
            submitText='Sign Up'
            showSocialLogin={true}
          />
        )}
      </section>
    </main>
  );
}
