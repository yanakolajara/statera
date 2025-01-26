import React from 'react';
import SearchBar from './SearchBar';
import List from './List';
import NewTransaction from './NewTransaction';

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
