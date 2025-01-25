import React from 'react';

export default function Timeframe() {
  return (
    <header className='date'>
      <section className='date__selector'>
        <button className='date-prev-btn btn'>⬅️</button>
        <h2>Date</h2>
        <button className='date-next-btn btn'>➡️</button>
      </section>
      <section className='date__frequency'>
        <button className='date__frequency-btn btn'>Weekly</button>
        <button className='date__frequency-btn btn'>Bi-Weekly</button>
        <button className='date__frequency-btn btn'>Monthly</button>
      </section>
    </header>
  );
}
