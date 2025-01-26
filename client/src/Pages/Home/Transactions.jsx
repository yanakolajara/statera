import React from 'react';
import SearchBar from './Transactions/SearchBar';
import List from './Transactions/List';
import NewTransaction from './Transactions/NewTransaction';

export default function Transactions() {
  return (
    <article className='transactions'>
      <h2>Transactions</h2>
      <SearchBar />
      <NewTransaction />
      <List />
    </article>
  );
}
