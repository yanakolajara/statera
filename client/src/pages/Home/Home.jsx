import React, { useState } from 'react';
import Transactions from './components/Transactions/Transactions.jsx';
import Stats from './components/Stats/Stats.jsx';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router';
import './Home.scss';
import TimeSelector from './components/TimeFilter/TimeSelector.jsx';
import { useTransactions } from '../../hooks/useTransactions.js';
import { getDisposableIncome } from '../../utils/transactions.utils.js';
import GeminiTools from './components/GeminiTools/GeminiTools.jsx';

export default function Home() {
  const { user } = useAuth();
  const [selectedTool, setSelectedTool] = useState('transactions');
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

  const disposable = getDisposableIncome(transactions);

  return (
    <main className='home'>
      <section className='time-filter'>
        <TimeSelector
          selectedDate={selectedDate}
          prevMonth={prevMonth}
          nextMonth={nextMonth}
        />

        <div className='disposable-income-container'>
          <h2
            className='amount'
            style={{ color: disposable > -1 ? '#96DA4D' : '#FD4E4E' }}
          >
            ${disposable}
          </h2>
          <h3 className='title'>Disposable income </h3>
        </div>
        {/* <Filter /> */}
      </section>

      <section className='dashboard'>
        <div className='dashboard-container container'>
          <div className='tool-selector'>
            <button
              className={`btn ${
                selectedTool === 'transactions' ? 'active' : ''
              }`}
              onClick={() => setSelectedTool('transactions')}
            >
              Transactions
            </button>
            <button
              className={`btn ${selectedTool === 'gemini' ? 'active' : ''}`}
              onClick={() => setSelectedTool('gemini')}
            >
              AI Assistant
            </button>
          </div>
          {selectedTool === 'transactions' ? (
            <Transactions
              transactions={transactions}
              loading={loading}
              addTransaction={addTransaction}
              editTransaction={editTransaction}
              removeTransaction={removeTransaction}
            />
          ) : (
            <GeminiTools />
          )}
        </div>
        <Stats transactions={transactions} loading={loading} />
      </section>
    </main>
  );
}
