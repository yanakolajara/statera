import React from 'react';

import { calculateTotal } from '../../../../utils/math.utils';
import { filterByKey } from '../../../../utils/filter.utils';
import Loading from '../../../../components/ui/Loading';
import { EXPENSES_CATEGORIES } from '../../../../constants/categories';
import Category from './Category';

export default function Categories({ expenses, loading }) {
  return (
    <div className='stats__categories'>
      {loading ? (
        <Loading />
      ) : (
        EXPENSES_CATEGORIES.map((category) => {
          const categoryTotal = calculateTotal(
            filterByKey(expenses, 'category', category),
            'amount'
          );
          return categoryTotal > 0 ? (
            <Category
              key={category}
              category={category}
              amount={categoryTotal}
            />
          ) : (
            <></>
          );
        })
      )}
    </div>
  );
}
