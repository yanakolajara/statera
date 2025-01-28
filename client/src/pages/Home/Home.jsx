import React from 'react';
import TimeFilter from './components/TimeFilter/TimeFilter.jsx';
import Transactions from './components/Transactions/Transactions.jsx';
import Stats from './components/Stats/Stats.jsx';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router';
import { useDate } from '../../hooks/useDate.js';
import { getMonth } from '../../utils/date.utils.js';
import './Home.scss';
import TimeSelector from './components/TimeFilter/TimeSelector.jsx';
import Filter from './components/TimeFilter/Filter.jsx';

export default function Home() {
  const { user } = useAuth();
  const {
    currentDate,
    // dateRange,
    // updateSelectedDate,
    // setMonthRange,
    // setWeekRange,
    // setBiWeeklyRange,
    // isWithinRange,
    // checkIsWithinRange,
    moveDatePrev,
    moveDateNext,
  } = useDate();

  const navigate = useNavigate();
  if (!user) {
    navigate('/welcome');
  }

  return (
    <main className='home'>
      <section className='time-filter'>
        <TimeSelector
          currentDate={currentDate}
          moveDatePrev={moveDatePrev}
          moveDateNext={moveDateNext}
        />
        <Filter />
      </section>

      <section className='dashboard'>
        <Transactions />
        <Stats />
      </section>
    </main>
  );
}
