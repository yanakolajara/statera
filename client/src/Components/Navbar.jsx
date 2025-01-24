import React from 'react';
import './Navbar.scss';

export default function Navbar() {
  const auth = false;
  return (
    <nav className='navbar'>
      <h1 className='navbar__header'>Statera</h1>
      <section className='navbar__routes'></section>
      <section className='navbar__auth'>
        {auth ? (
          <button className='btn'>Log Out</button>
        ) : (
          <>
            <button className='btn'>Log In</button>
            <button className='btn'>Sign Up</button>
          </>
        )}
      </section>
    </nav>
  );
}
