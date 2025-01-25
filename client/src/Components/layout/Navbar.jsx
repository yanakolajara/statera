import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.scss';
import { useAuth } from '../../hooks/useAuth';

export default function Navbar() {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  return (
    <nav className='navbar'>
      <a className='navbar__header' href='/'>
        Statera
      </a>
      <section className='navbar__routes'></section>
      <section className='navbar__auth'>
        {user ? (
          <button
            className='btn'
            onClick={() => {
              logout();
            }}
          >
            Log Out
          </button>
        ) : (
          <>
            <button
              className='btn'
              onClick={() => {
                navigate('/login');
              }}
            >
              Log In
            </button>
            <button
              className='btn'
              onClick={() => {
                navigate('/signup');
              }}
            >
              Sign Up
            </button>
          </>
        )}
      </section>
    </nav>
  );
}
