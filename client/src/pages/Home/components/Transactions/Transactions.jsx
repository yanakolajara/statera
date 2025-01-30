import React from 'react';
import List from './List.jsx';
import TransactionForm from './TransactionForm.jsx';
// import Searchbar from '../../../../components/ui/Searchbar.jsx';

export default function Transactions({
  transactions,
  loading,
  addTransaction,
  editTransaction,
  removeTransaction,
}) {
  return (
    <article className='transactions container'>
      <h2>Transactions</h2>
      {/* <Searchbar /> */}
      <TransactionForm onSubmit={addTransaction} />
      <List
        isLoading={loading}
        transactionsData={transactions}
        editTransaction={editTransaction}
        removeTransaction={removeTransaction}
      />
    </article>
  );
}
