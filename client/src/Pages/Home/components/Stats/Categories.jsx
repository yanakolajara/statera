import React from 'react';
import { TRANSACTION_CATEGORIES } from '../../../../constants/categories';
import { calculateTotal } from '../../../../utils/math.utils';
import { useTransactions } from '../../useTransactions';
import { filterByKey } from '../../../../utils/filter.utils';
import Loading from '../../../../components/ui/Loading';
import Category from './Category';

export default function Categories() {
  const { transactions, loading } = useTransactions();

  return (
    <div className='stats__categories'>
      {loading ? (
        <Loading />
      ) : (
        TRANSACTION_CATEGORIES.map((category) => (
          <Category
            key={category}
            category={category}
            amount={calculateTotal(
              filterByKey(transactions, 'category', category),
              'amount'
            )}
          />
        ))
      )}
    </div>
  );
}
