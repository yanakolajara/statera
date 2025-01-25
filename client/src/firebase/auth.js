import {
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import auth from './firebaseConfig';

export const firebaseSignIn = (email, password) =>
  signInWithEmailAndPassword(auth, email, password).then(
    (userCredential) => userCredential.user
  );

export const firebaseSignUp = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password).then(
    (userCredential) => userCredential.user
  );

export const firebaseSignOut = () => signOut(auth);

export const initializeAuthListener = (onUserChanged) =>
  onAuthStateChanged(auth, onUserChanged);
