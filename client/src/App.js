import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import Navbar from './components/layout/Navbar';
import './App.scss';
import { useAuth } from './hooks/useAuth';
import WelcomePage from './pages/Welcome/Welcome';

function App() {
  const { user } = useAuth();
  const isUserAuthenticated = !!user;
  return (
    <div className='App'>
      <Navbar />
      <Routes>
        {isUserAuthenticated ? (
          <Route path='/' element={<Home />} />
        ) : (
          <Route path='/' element={<WelcomePage />} />
        )}
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
