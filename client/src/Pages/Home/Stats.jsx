import React from 'react';

export default function Stats() {
  return (
    <article className='stats'>
      <h2>Spendings</h2>
      <div className='stats__chart'>
        <p>Chart</p>
      </div>
      <div className='stats__categories'>
        <div className='category'>
          <span>Icon</span>
          <p>Category</p>
          <p>Amount</p>
        </div>
      </div>
    </article>
  );
}
