import React from 'react';
import TimeFilter from './components/TimeFilter/TimeFilter.jsx';
import Transactions from './components/Transactions/Transactions.jsx';
import Stats from './components/Stats/Stats.jsx';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router';
import { useDate } from '../../hooks/useDate.js';
import { getMonth } from '../../utils/date.utils.js';
import './Home.scss';
import TimeSelector from './components/TimeFilter/TimeSelector.jsx';
import Filter from './components/TimeFilter/Filter.jsx';
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
        <Stats transactions={transactions} />
      </section>
    </main>
  );
}
