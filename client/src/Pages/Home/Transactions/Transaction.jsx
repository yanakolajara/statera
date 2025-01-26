import React from 'react';

const style = {
  display: 'flex',
  'flex-direction': 'row',
  'justify-content': 'space-between',
  'align-items': 'center',
  'padding-bottom': '1rem',
  'margin-bottom': '1rem',
};
export default function Transaction() {
  return (
    <div className='transaction' style={style}>
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
  );
}
