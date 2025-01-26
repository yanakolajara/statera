import React from 'react';

export default function TimeFilter() {
  return (
    <header className='time-filter'>
      <section className='time-selector'>
        <button className='time-btn'>⬅️</button>
        <h2>Date</h2>
        <button className='time-btn'>➡️</button>
      </section>
      <section className='filter'>
        <button className='filter-btn btn'>Weekly</button>
        <button className='filter-btn btn'>Bi-Weekly</button>
        <button className='filter-btn btn'>Monthly</button>
      </section>
    </header>
  );
}
