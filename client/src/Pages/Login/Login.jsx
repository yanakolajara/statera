import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

function Login() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Instancia de useNavigate

  const handleLogin = async () => {
    try {
      await signIn(email, password); // Llama a la función de autenticación
      navigate('/'); // Redirige al usuario al home
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };

  return (
    <div>
      <input
        type='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
