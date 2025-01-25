import React from 'react';
import './Navbar.scss';

export default function Navbar(props) {
  const { user } = props;

  return (
    <nav className='navbar'>
      <header className='navbar__header'>
        <h1>Statera</h1>
      </header>
      <section className='navbar__routes'></section>
      <section className='navbar__auth'>
        {user ? (
          <i className='navbar__auth__btn btn' href='/'>
            <span>i</span>
            <p>Logout</p>
          </i>
        ) : (
          <>
            <i className='navbar__auth__btn' href='/login'>
              Log In
            </i>
            <a className='navbar__auth__btn' href='/signup'>
              <span>i</span>
              <p>Sign Up</p>
            </a>
          </>
        )}
      </section>
    </nav>
  );
}
