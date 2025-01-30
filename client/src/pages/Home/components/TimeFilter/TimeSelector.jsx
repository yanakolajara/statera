import React, { useEffect } from 'react';
import { format } from 'date-fns';
import { ReactComponent as ArrowPrev } from '../../../../assets/icons/arrow-prev.svg';
import { ReactComponent as ArrowNext } from '../../../../assets/icons/arrow-next.svg';

export default function TimeSelector({ selectedDate, prevMonth, nextMonth }) {
  useEffect(() => {
    console.log('CURRENT DATE', selectedDate);
  }, [selectedDate]);

  return (
    <section className='time-selector'>
      <button
        name='move-prev'
        className='time-btn'
        onClick={prevMonth}
        style={{ width: '50px', height: '50px' }}
      >
        <ArrowPrev style={{ width: '100%', height: '100%', padding: '0' }} />
      </button>
      <h2>{format(selectedDate, 'MMMM')}</h2>
      <button
        name='move-next'
        className='time-btn'
        onClick={nextMonth}
        style={{ width: '50px', height: '50px' }}
      >
        <ArrowNext style={{ width: '100%', height: '100%', padding: '0' }} />
      </button>
    </section>
  );
}
