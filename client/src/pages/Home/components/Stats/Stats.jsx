import React from 'react';
import Chart from './Chart';
import Categories from './Categories';
import Category from './Category';
import { useTransactions } from '../../useTransactions';
import { getDisposableIncome } from '../../../../utils/transactions.utils';

export default function Stats() {
  // const { transactions } = useTransactions();
  const transactions = [
    {
      id: 1,
      user_id: 'wdq6aThIJzQNBanQ47WTRL1W6Xr1',
      amount: 963.73,
      type: 'income',
      category: 'salary',
      description: 'Best buy check',
      date: '2025-01-01T10:00:00Z',
    },
    {
      id: 2,
      user_id: 'wdq6aThIJzQNBanQ47WTRL1W6Xr1',
      amount: 162.55,
      type: 'expense',
      category: 'groceries',
      description: 'Walmart purchases',
      date: '2025-01-02T11:00:00Z',
    },
    {
      id: 3,
      user_id: 'wdq6aThIJzQNBanQ47WTRL1W6Xr1',
      amount: 20.99,
      type: 'expense',
      category: 'utilities',
      description: 'Electricity bill',
      date: '2025-01-02T12:00:00Z',
    },
    {
      id: 4,
      user_id: 'wdq6aThIJzQNBanQ47WTRL1W6Xr1',
      amount: 32.74,
      type: 'expense',
      category: 'entertainment',
      description: 'Movie night',
      date: '2025-01-03T13:00:00Z',
    },
  ];

  return (
    <article className='stats'>
      <h1>Disposable income: {getDisposableIncome(transactions)}</h1>
      <Chart />
      <Categories>
        <Category />
      </Categories>
    </article>
  );
}
