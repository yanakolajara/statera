import React, { useEffect } from 'react';
import { format } from 'date-fns';

export default function TimeSelector({ selectedDate, prevMonth, nextMonth }) {
  useEffect(() => {
    console.log('CURRENT DATE', selectedDate);
  }, [selectedDate]);

  return (
    <section className='time-selector'>
      <button name='move-prev' className='time-btn' onClick={prevMonth}>
        ⬅️
      </button>
      <h2>{format(selectedDate, 'MMMM')}</h2>
      <button name='move-next' className='time-btn' onClick={nextMonth}>
        ➡️
      </button>
    </section>
  );
}
