import React from 'react';

export default function Transactions() {
  return (
    <article className='transactions'>
      <h2>Transactions</h2>
      <div className='searchbar'>
        <input type='text' placeholder='Search transactions' />
      </div>
      <div className='content'>
        <div className='transaction'>
          <span className='transaction__icon'>Icon</span>
          <div className='transaction__data'>
            <h3>Description</h3>
            <p>Date</p>
            <p>Amount</p>
          </div>
          <div className='transaction__options'>
            <button className='edit btn'>Edit</button>
            <button className='delete btn'>Delete</button>
          </div>
        </div>
      </div>
    </article>
  );
}
