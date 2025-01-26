import React from 'react';
import Chart from './Chart';
import Categories from './Categories';
import Category from './Category';

export default function Stats() {
  return (
    <article className='stats'>
      <Chart />
      <Categories>
        <Category />
      </Categories>
    </article>
  );
}
