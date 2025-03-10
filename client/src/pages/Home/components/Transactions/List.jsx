import React from 'react';
import Transaction from './Transaction.jsx';
import Loading from '../../../../components/ui/Loading.jsx';

const style = {};
export default function List(props) {
  const { isLoading, transactionsData, editTransaction, removeTransaction } =
    props;
  if (isLoading) {
    return <Loading />;
  }

  return (
    <ul className='list' style={style}>
      {transactionsData.length ? (
        transactionsData.map((transaction) => (
          <Transaction
            transaction={transaction}
            editTransaction={editTransaction}
            removeTransaction={removeTransaction}
          />
        ))
      ) : (
        <p className='no-transactions'>No transactions found for this month.</p>
      )}
    </ul>
  );
}
