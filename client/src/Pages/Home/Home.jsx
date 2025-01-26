import React from 'react';
import TimeFilter from './components/TimeFilter/TimeFilter';
import Transactions from './components/Transactions/Transactions';
import Stats from './components/Stats/Stats';
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
