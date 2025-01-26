import React from 'react';
import Transaction from './Transaction';

const style = {};
export default function List() {
  return (
    <div className='list' style={style}>
      <Transaction />
    </div>
  );
}
