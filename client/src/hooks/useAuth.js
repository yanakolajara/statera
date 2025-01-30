import { useState, useEffect } from 'react';
import AxiosInstance from '../api/axios';

import toast from 'react-hot-toast';

export function useAuth() {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saveEmail, setSaveEmail] = useState('');

  useEffect(() => {
    console.log('USE EFFECT/USER:', user);
    console.log('USE EFFECT/SAVEEMAIL:', saveEmail);
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (savedToken && savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log('useeffect.SaveEmail:, saveEnail');
  }, [saveEmail]);

  const signUp = async (email, password, userData) => {
    try {
      setLoading(true);
      const body = {
        email,
        password,
        ...userData,
      };
      const res = await AxiosInstance.post('/auth/register', body);
      if (res.data.success) {
        toast.success(
          res.data.message ||
            'Registration successful. Check your email for the MFA code.'
        );
        return res.data;
      } else {
        toast.error(res.data.error || 'An error occurred during registration.');
      }
    } catch (error) {
      console.log('🚀 ~ signUp ~ error:', error.response.data.error);
      const msg =
        error?.response?.data?.error ||
        'An error occurred during registration.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const completeEnrollment = async (email, verificationCode) => {
    try {
      console.log('=== Complete Enrollment Started ===');
      console.log('Received params:', { email, verificationCode });
      console.log('Current saveEmail state:', saveEmail);

      setLoading(true);

      const body = {
        email,
        code: verificationCode,
      };
      console.log('Request body:', body);

      const res = await AxiosInstance.post('/auth/complete-enrollment', body);
      console.log('Server response:', res.data);

      if (res.data.success) {
        const token = res.data.token;
        const userData = res.data.userData;
        console.log('🚀 ~ completeEnrollment ~ token:', token);
        console.log('🚀 ~ completeEnrollment ~ userData:', userData);

        localStorage.setItem('token', token);
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));

        return res.data;
      } else {
        console.log('Request failed:', res.data);
      }
    } catch (error) {
      console.error('=== Complete Enrollment Error ===');
      console.error('Error details:', error);
      console.error('Error response:', error?.response?.data);
      const msg = error?.response?.data?.error || 'Error verificando usuario.';
      toast.error(msg);
    } finally {
      console.log('=== Complete Enrollment Finished ===');
      setLoading(false);
    }
  };

  const signIn = async (email, password) => {
    try {
      setLoading(true);
      const res = await AxiosInstance.post('/auth/login', { email, password });
      console.log('🚀 ~ signIn ~ res:', res);
      if (res.data.success) {
        toast.success(
          res.data.message || 'Please check your email for verification code'
        );
        return { success: true, requiresMFA: true };
      } else {
        toast.error(res.data.error || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Error in signIn:', error);
      const msg = error?.response?.data?.error || 'Login error.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const verifyUser = async (email, verificationCode) => {
    try {
      setLoading(true);
      const res = await AxiosInstance.post('/auth/verify-login', {
        email,
        verification_code: verificationCode,
      });

      if (res.data.success) {
        const { token, userData } = res.data;
        localStorage.setItem('token', token);
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        toast.success(res.data.message || 'Login successful');
        return res.data;
      } else {
        toast.error(res.data.error || 'Verification failed');
      }
    } catch (error) {
      console.error('Error in verifyUser:', error);
      const msg = error?.response?.data?.error || 'Error verifying user.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    toast.success('Sesión cerrada');
    window.location.reload();
  };

  return {
    user,
    loading,
    saveEmail,
    completeEnrollment,
    setSaveEmail,
    signUp,

    verifyUser,

    signIn,

    logout,
  };
}
