import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import auth from './firebaseConfig';
import { firebaseAuthErrors } from './authErrors';

export const firebaseSignUp = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      sendEmailVerification(cred.user);
      return cred.user;
    })
    .catch((error) => {
      console.log('error here!', error);
      throw new Error(firebaseAuthErrors[error.code] || 'Unknown error');
    });

export const firebaseSignIn = (email, password) =>
  signInWithEmailAndPassword(auth, email, password)
    .then((cred) => cred.user)
    .catch((error) => {
      throw new Error(firebaseAuthErrors[error.code] || 'Unknown error');
    });

export const firebaseSignOut = () => signOut(auth);

export const initializeAuthListener = (onUserChanged) =>
  onAuthStateChanged(auth, onUserChanged);
