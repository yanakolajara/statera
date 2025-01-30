import React from 'react';
import Transactions from './components/Transactions/Transactions.jsx';
import Stats from './components/Stats/Stats.jsx';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router';
import './Home.scss';
import TimeSelector from './components/TimeFilter/TimeSelector.jsx';
import { useTransactions } from '../../hooks/useTransactions.js';

export default function Home() {
  const { user } = useAuth();
  const {
    transactions,
    nextMonth,
    prevMonth,
    selectedDate,
    loading,
    addTransaction,
    editTransaction,
    removeTransaction,
  } = useTransactions();

  const navigate = useNavigate();
  if (!user) {
    navigate('/welcome');
  }

  return (
    <main className='home'>
      <section className='time-filter'>
        <TimeSelector
          selectedDate={selectedDate}
          prevMonth={prevMonth}
          nextMonth={nextMonth}
        />
        {/* <Filter /> */}
      </section>

      <section className='dashboard'>
        <Transactions
          transactions={transactions}
          loading={loading}
          addTransaction={addTransaction}
          editTransaction={editTransaction}
          removeTransaction={removeTransaction}
        />
        <Stats transactions={transactions} loading={loading} />
      </section>
    </main>
  );
}
