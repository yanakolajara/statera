import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { createUser, updateUser } from '../api/users';
import {
  firebaseSignIn,
  firebaseSignUp,
  firebaseSignOut,
  initializeAuthListener,
} from '../firebase/auth';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cookies, setCookie, removeCookie] = useCookies(['user']);

  useEffect(() => {
    const unsubscribe = initializeAuthListener((firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        setCookie('user', JSON.stringify(firebaseUser), {
          path: '/',
          maxAge: 604800,
        });
      } else {
        setUser(null);
        removeCookie('user', { path: '/' });
      }
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, [setCookie, removeCookie]);

  const signIn = async (email, password) => {
    try {
      setLoading(true);
      const firebaseUser = await firebaseSignIn(email, password);
      setUser(firebaseUser);
      setCookie('user', JSON.stringify(firebaseUser), {
        path: '/',
        maxAge: 604800,
      });
      setLoading(false);
    } catch (error) {
      console.error('Error signing in:', error);
      setLoading(false);
      throw error;
    }
  };

  const signUp = async (email, password, userData) => {
    try {
      setLoading(true);
      const firebaseUser = await firebaseSignUp(email, password);
      const dbUser = await createUser({
        id: firebaseUser.uid,
        ...userData,
      });

      setUser({ ...firebaseUser, dbData: dbUser });
      setCookie('user', JSON.stringify({ ...firebaseUser, dbData: dbUser }), {
        path: '/',
        maxAge: 604800,
      });
      setLoading(false);
    } catch (error) {
      console.error('Error signing up:', error);
      setLoading(false);
      throw error;
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await firebaseSignOut();
      setUser(null);
      removeCookie('user', { path: '/' });
      setLoading(false);
    } catch (error) {
      console.error('Error signing out:', error);
      setLoading(false);
    }
  };

  // updateUserProfile remains the same as it doesn't involve Firebase auth
  const updateUserProfile = async (userId, userData) => {
    try {
      setLoading(true);
      const updatedUser = await updateUser(userId, userData);
      setUser((currentUser) => ({
        ...currentUser,
        dbData: updatedUser,
      }));
      setCookie(
        'user',
        JSON.stringify({
          ...user,
          dbData: updatedUser,
        }),
        {
          path: '/',
          maxAge: 604800,
        }
      );
      setLoading(false);
      return updatedUser;
    } catch (error) {
      console.error('Error updating user:', error);
      setLoading(false);
      throw error;
    }
  };

  return {
    user,
    loading,
    signIn,
    signUp,
    logout,
    updateUserProfile,
  };
}
