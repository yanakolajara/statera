import React from 'react';
import Chart from './Stats/Chart';
import Categories from './Stats/Categories';
import Category from './Stats/Category';

export default function Stats() {
  return (
    <article className='stats'>
      <h2>Spendings</h2>
      <Chart />
      <Categories>
        <Category />
      </Categories>
    </article>
  );
}
