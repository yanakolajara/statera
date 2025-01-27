import React from 'react';
import Filter from './Filter.jsx';
import TimeSelector from './TimeSelector.jsx';

export default function TimeFilter() {
  return (
    <header className='time-filter'>
      <TimeSelector />
      <Filter />
    </header>
  );
}
