import React from 'react';
import SearchBar from './SearchBar';
import List from './List';
import TransactionForm from './TransactionForm';
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
