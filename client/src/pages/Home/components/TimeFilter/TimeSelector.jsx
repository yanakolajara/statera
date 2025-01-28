import React from 'react';
import { format } from 'date-fns';

export default function TimeSelector({ currentDate }) {
  return (
    <section className='time-selector'>
      <button className='time-btn'>⬅️</button>
      <h2>{format(currentDate, 'MMMM')}</h2>
      <button className='time-btn'>➡️</button>
    </section>
  );
}
