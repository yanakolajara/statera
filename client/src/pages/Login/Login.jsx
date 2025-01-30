import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Form from '../../components/ui/Form';
import toast, { Toaster } from 'react-hot-toast';

function Login() {
  const { signIn, verifyUser } = useAuth();
  const [renderVerification, setRenderVerification] = useState(false);
  const [code, setCode] = useState('');
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
    const loadingToast = toast.loading('Signing in...');

    try {
      const result = await signIn(formData.email, formData.password);
      console.log('🚀 ~ handleSubmit ~ result:', result);

      if (result.success) {
        if (result.requiresMFA) {
          toast.success('Please enter verification code', { id: loadingToast });
          setRenderVerification(true);
        } else {
          toast.success('Successfully logged in!', { id: loadingToast });
          navigate('/');
        }
      } else {
        toast.error(result.error || 'Login failed', { id: loadingToast });
      }
    } catch (error) {
      toast.error('An unexpected error occurred', { id: loadingToast });
      console.error('Login failed:', error.message);
    }
  };

  const handleVerificationSubmit = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading('Verifying code...');

    try {
      const result = await verifyUser(formData.email, code);
      if (result.success) {
        toast.success('Successfully verified!', { id: loadingToast });
        navigate('/');
      } else {
        toast.error(result.error || 'Verification failed', {
          id: loadingToast,
        });
      }
    } catch (error) {
      toast.error('An unexpected error occurred', { id: loadingToast });
      console.error('Verification failed:', error.message);
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
      <Toaster position='top-center' />
      <section className='login-container'>
        <h1 className='login-title'>Login</h1>
        {renderVerification ? (
          <form
            onSubmit={handleVerificationSubmit}
            className='verification-form'
          >
            <div className='flex-column'>
              <label>Verification Code</label>
              <div className='inputForm'>
                <input
                  type='text'
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder='Enter verification code'
                  required
                />
              </div>
            </div>
            <button className='button-submit' type='submit'>
              Verify
            </button>
          </form>
        ) : (
          <Form
            fields={fields}
            values={formData}
            onChange={handleChange}
            onSubmit={handleSubmit}
            submitText='Login'
            showSocialLogin={true}
          />
        )}
      </section>
    </main>
  );
}

export default Login;
