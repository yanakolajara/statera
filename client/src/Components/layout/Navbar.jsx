import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

import { ReactComponent as LoginIcon } from '../../assets/icons/login.svg';

import './Navbar.scss';

export default function Navbar() {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  return (
    <nav className='navbar'>
      <a className='navbar__header txt' href='/'>
        Statera
      </a>
      <section className='navbar__routes'></section>
      <section className='navbar__auth'>
        {user ? (
          <button className='btn txt' onClick={() => logout()}>
            <LoginIcon />
            Log Out
          </button>
        ) : (
          <>
            <button className='btn txt' onClick={() => navigate('/login')}>
              <LoginIcon /> Log In
            </button>
            <button className='btn txt' onClick={() => navigate('/signup')}>
              <LoginIcon /> Sign Up
            </button>
          </>
        )}
      </section>
    </nav>
  );
}
