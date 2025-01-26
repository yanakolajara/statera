import React from 'react';

export default function Category({ category, amount }) {
  return (
    <article className='category'>
      <span>Icon</span>
      <p>{category}</p>
      <p>${amount}</p>
    </article>
  );
}
