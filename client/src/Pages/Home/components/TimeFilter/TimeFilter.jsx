import React from 'react';
import Filter from './Filter';
import TimeSelector from './TimeSelector';

export default function TimeFilter() {
  return (
    <header className='time-filter'>
      <TimeSelector />
      <Filter />
    </header>
  );
}
