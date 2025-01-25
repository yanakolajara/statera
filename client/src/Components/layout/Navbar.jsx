import React from 'react';
import './Navbar.scss';
import { useNavigate } from 'react-router-dom';

export default function Navbar(props) {
  const { user } = props;

  const navigate = useNavigate();

  return (
    <nav className='navbar'>
      <h1 className='navbar__header'>Statera</h1>
      <section className='navbar__routes'></section>
      <section className='navbar__auth'>
        {user ? (
          <button
            className='btn'
            onClick={() => {
              //TODO signOut();
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
