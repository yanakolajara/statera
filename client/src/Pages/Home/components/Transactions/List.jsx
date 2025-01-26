import React from 'react';
import Transaction from './Transaction';
import Loading from '../../../../components/ui/Loading';

const style = {};
export default function List(props) {
  const { isLoading, transactionsData, editTransaction, removeTransaction } =
    props;
  if (isLoading) {
    return <Loading />;
  }

  return (
    <ul className='list' style={style}>
      {transactionsData.map((transaction) => (
        <Transaction
          key={transaction.id}
          transaction={transaction}
          editTransaction={editTransaction}
          removeTransaction={removeTransaction}
        />
      ))}
    </ul>
  );
}
