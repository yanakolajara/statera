import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  // sendEmailVerification,
  // multiFactor,
  // PhoneAuthProvider,
  // PhoneMultiFactorGenerator,
  // RecaptchaVerifier,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import auth from './firebaseConfig';
import { firebaseAuthErrors } from './authErrors';

// export const enableMultiFactorAuth = async (user, phoneNumber) => {
//   try {
//     const recaptchaVerifier = new RecaptchaVerifier(
//       'recaptcha-container',
//       { size: 'invisible' },
//       user
//     );

//     const phoneAuthProvider = new PhoneAuthProvider(user);

//     // Send verification code to user's phone
//     const verificationId = await phoneAuthProvider.verifyPhoneNumber(
//       phoneNumber,
//       recaptchaVerifier
//     );

//     // Return verificationId to be used when completing enrollment
//     return verificationId;
//   } catch (error) {
//     console.error('Error initiating MFA:', error);
//     throw new Error(firebaseAuthErrors[error.code] || 'Failed to initiate MFA');
//   }
// };

// export const completeMFAEnrollment = async (
//   user,
//   verificationId,
//   verificationCode
// ) => {
//   try {
//     const credential = PhoneAuthProvider.credential(
//       verificationId,
//       verificationCode
//     );
//     const multiFactorAssertion =
//       PhoneMultiFactorGenerator.assertion(credential);

//     await multiFactor(user).enroll(multiFactorAssertion, 'Phone MFA');
//     return true;
//   } catch (error) {
//     console.error('Error completing MFA enrollment:', error);
//     throw new Error(
//       firebaseAuthErrors[error.code] || 'Failed to complete MFA enrollment'
//     );
//   }
// };
export const firebaseSignUp = (email, password, phone) =>
  createUserWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      return cred.user;
    })
    // .then(async (cred) => {
    //   await sendEmailVerification(cred.user);
    //   try {
    //     const verificationId = await enableMultiFactorAuth(cred.user, phone);
    //     return { user: cred.user, verificationId };
    //   } catch (error) {
    //     throw new Error(
    //       firebaseAuthErrors[error.code] || 'Failed to setup MFA'
    //     );
    //   }
    // })
    .catch((error) => {
      throw new Error(firebaseAuthErrors[error.code] || 'Unknown error');
    });

export const firebaseSignIn = (email, password) =>
  signInWithEmailAndPassword(auth, email, password)
    .then((cred) => cred.user)
    .catch((error) => {
      alert(firebaseAuthErrors[error.code] || 'Unknown error');
    });

export const firebaseSignOut = () => signOut(auth);

export const initializeAuthListener = (onUserChanged) =>
  onAuthStateChanged(auth, onUserChanged);
