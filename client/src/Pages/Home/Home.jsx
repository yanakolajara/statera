import React from 'react';
import TimeFilter from './TimeFilter';
import Transactions from './Transactions';
import Stats from './Stats';
import './Home.scss';

export default function Home() {
  return (
    <main className='home'>
      <TimeFilter />
      <section className='dashboard'>
        <Transactions />
        <Stats />
      </section>
    </main>
  );
}
