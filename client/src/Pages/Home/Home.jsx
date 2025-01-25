import React from 'react';
import Timeframe from './Date';
import Transactions from './Transactions';
import Stats from './Stats';
import './Home.scss';

export default function Home() {
  return (
    <main className='home'>
      <Timeframe />
      <section className='dashboard'>
        <Transactions />
        <Stats />
      </section>
    </main>
  );
}
