import { useState, useEffect } from 'react';
import {
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import auth from '../firebase/firebaseConfig';
import { useCookies } from 'react-cookie';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cookies, setCookie, removeCookie] = useCookies(['user']);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
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
      console.log('Component will unmount');
      unsubscribe();
    };
  }, [setCookie, removeCookie]);

  const signIn = async (email, password) => {
    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const firebaseUser = userCredential.user;

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

  const signUp = async (email, password) => {
    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const firebaseUser = userCredential.user;

      setUser(firebaseUser);
      setCookie('user', JSON.stringify(firebaseUser), {
        path: '/',
        maxAge: 604800,
      });
      setLoading(false);
    } catch (error) {
      console.error('Error signing up:', error);
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await signOut(auth);

      setUser(null);
      removeCookie('user', { path: '/' });
      setLoading(false);
    } catch (error) {
      console.error('Error signing out:', error);
      setLoading(false);
    }
  };

  return { user, loading, signIn, signUp, logout };
}
