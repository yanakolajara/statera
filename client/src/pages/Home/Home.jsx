import React from 'react';
import TimeFilter from './components/TimeFilter/TimeFilter.jsx';
import Transactions from './components/Transactions/Transactions.jsx';
import Stats from './components/Stats/Stats.jsx';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router';
import './Home.scss';

export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();
  if (!user) {
    navigate('/welcome');
  }

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
