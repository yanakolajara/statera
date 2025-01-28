import React from 'react';
import Chart from './Chart';
import Categories from './Categories';
import Category from './Category';
import { useTransactions } from '../../../../hooks/useTransactions.js';

import { getDisposableIncome } from '../../../../utils/transactions.utils';

export default function Stats() {
  const { transactions } = useTransactions();

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
