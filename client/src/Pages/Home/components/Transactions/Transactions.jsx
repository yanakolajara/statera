import React from 'react';
import SearchBar from './SearchBar.jsx';
import List from './List.jsx';
import TransactionForm from './TransactionForm.jsx';
import { useTransactions } from '../../useTransactions';

export default function Transactions() {
  const {
    transactions: transactionsData,
    loading: isLoading,
    addTransaction,
    editTransaction,
    removeTransaction,
  } = useTransactions();
  return (
    <article className='transactions'>
      <h2>Transactions</h2>
      <SearchBar />
      <TransactionForm onSubmit={addTransaction} />
      <List
        isLoading={isLoading}
        transactionsData={transactionsData}
        editTransaction={editTransaction}
        removeTransaction={removeTransaction}
      />
    </article>
  );
}
