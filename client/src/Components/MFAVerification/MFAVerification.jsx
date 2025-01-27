// import React, { useState } from 'react';
// import {
//   enableMultiFactorAuth,
//   completeMFAEnrollment,
// } from '../../firebase/auth';

// const MFAVerification = ({ user, onSuccess, onError }) => {
//   const [step, setStep] = useState('phone'); // 'phone' or 'code'
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [verificationCode, setVerificationCode] = useState('');
//   const [verificationId, setVerificationId] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handlePhoneSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     try {
//       const verId = await enableMultiFactorAuth(user, phoneNumber);
//       setVerificationId(verId);
//       setStep('code');
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCodeSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     try {
//       await completeMFAEnrollment(user, verificationId, verificationCode);
//       onSuccess?.();
//     } catch (err) {
//       setError(err.message);
//       onError?.(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (step === 'phone') {
//     return (
//       <div className='mfa-verification'>
//         <h2>Enable Two-Factor Authentication</h2>
//         <p>Enter your phone number to receive verification codes</p>
//         <form onSubmit={handlePhoneSubmit}>
//           <input
//             type='tel'
//             value={phoneNumber}
//             onChange={(e) => setPhoneNumber(e.target.value)}
//             placeholder='+1 (555) 123-4567'
//             required
//           />
//           {error && <div className='error'>{error}</div>}
//           <button type='submit' disabled={loading}>
//             {loading ? 'Sending...' : 'Send Code'}
//           </button>
//         </form>
//         <div id='recaptcha-container'></div>
//       </div>
//     );
//   }

//   return (
//     <div className='mfa-verification'>
//       <h2>Verify Your Phone</h2>
//       <p>Enter the verification code sent to {phoneNumber}</p>
//       <form onSubmit={handleCodeSubmit}>
//         <input
//           type='text'
//           value={verificationCode}
//           onChange={(e) => setVerificationCode(e.target.value)}
//           placeholder='Enter verification code'
//           required
//         />
//         {error && <div className='error'>{error}</div>}
//         <button type='submit' disabled={loading}>
//           {loading ? 'Verifying...' : 'Verify Code'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default MFAVerification;
