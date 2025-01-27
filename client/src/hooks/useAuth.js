import { useState, useEffect } from 'react';
import { createUser } from '../api/users';
import {
  firebaseSignIn,
  firebaseSignUp,
  firebaseSignOut,
  initializeAuthListener,
  completeMFAEnrollment,
} from '../firebase/auth';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [verificationId, setVerificationId] = useState(null);

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
      const userCredentials = await firebaseSignIn(email, password);
      setUser(userCredentials);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const signUp = async (email, password, userData) => {
    console.log('userData', userData);
    setLoading(true);
    try {
      const userCredentials = await firebaseSignUp(email, password, userData);
      setUser(userCredentials);
      // setVerificationId(verId);
      console.log(userCredentials);
      await createUser({
        id: userCredentials.uid,
        ...userData,
      });
    } catch (error) {
      console.error('Error signing up:', error);
      setLoading(false);
      throw error;
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
    verificationId,
  };
}
