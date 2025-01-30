import React from 'react';
import Chart from './Chart';
import Categories from './Categories';
import Category from './Category';
import { filterExpenses } from '../../../../utils/transactions.utils';

export default function Stats({ transactions, loading }) {
  const expenses = filterExpenses(transactions);
  return (
    <article className='stats'>
      <Chart expenses={expenses} loading={loading} />
      <Categories expenses={expenses} loading={loading}>
        <Category />
      </Categories>
    </article>
  );
}
