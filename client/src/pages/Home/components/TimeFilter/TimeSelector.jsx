import React, { useEffect } from 'react';
import { format } from 'date-fns';

export default function TimeSelector({
  currentDate,
  moveDatePrev,
  moveDateNext,
}) {
  const handleClick = (e) => {
    const { name } = e.target;
    console.log(name);
    if (name === 'move-prev') {
      console.log('BACK');
      moveDatePrev();
    } else {
      console.log('NEXT');
      moveDateNext();
    }
  };

  useEffect(() => {
    console.log('CURRENT DATE', currentDate);
  }, [currentDate]);

  return (
    <section className='time-selector'>
      <button name='move-prev' className='time-btn' onClick={handleClick}>
        ⬅️
      </button>
      <h2>{format(currentDate, 'MMMM')}</h2>
      <button name='move-next' className='time-btn' onClick={handleClick}>
        ➡️
      </button>
    </section>
  );
}
