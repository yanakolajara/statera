import { useState, useEffect } from 'react';
import { createUser } from '../api/users';
import {
  firebaseSignIn,
  firebaseSignUp,
  firebaseSignOut,
  initializeAuthListener,
  // completeMFAEnrollment,
} from '../firebase/auth';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [verificationId, setVerificationId] = useState(null);

  useEffect(() => {
    const unsubscribe = initializeAuthListener((firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const signIn = async (email, password) => {
    setLoading(true);
    try {
      const cred = await firebaseSignIn(email, password);
      if (!cred.emailVerified) {
        await firebaseSignOut();
        alert('Please verify your email before signing in.');
        return { success: false, error: 'Email not verified' };
      } else {
        setUser(cred);
        return { success: true };
      }
    } catch (e) {
      return { success: false, error: e.message };
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email, password, userData) => {
    setLoading(true);
    try {
      const cred = await firebaseSignUp(email, password);
      await createUser({
        ...userData,
        id: cred.uid,
      });
      return { success: true };
    } catch (e) {
      return { success: false, error: e.message };
    } finally {
      setLoading(false);
    }
  };

  // const completeMFASetup = async (verificationCode) => {
  //   try {
  //     setLoading(true);
  //     await completeMFAEnrollment(user, verificationId, verificationCode);
  //     setVerificationId(null);
  //     setLoading(false);
  //   } catch (error) {
  //     setLoading(false);
  //     throw error;
  //   }
  // };

  const logout = async () => {
    try {
      setLoading(true);
      await firebaseSignOut();
      setUser(null);
      setLoading(false);
    } catch (error) {
      console.error('Error signing out:', error);
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    signIn,
    signUp,
    logout,
    // completeMFASetup,
    // verificationId,
  };
}
