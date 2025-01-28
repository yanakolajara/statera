import { useState } from 'react';
import {
  getMonthRange,
  getWeekRange,
  getBiWeeklyRange,
  isWithinRange,
} from '../utils/date.utils';
import { addMonths, subMonths } from 'date-fns';

export function useDate() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [periodType, setPeriodType] = useState('month');

  const moveDatePrev = () => {
    switch (periodType) {
      case 'month':
        return setCurrentDate((prev) => subMonths(prev, 1));
      default:
        break;
    }
  };

  const moveDateNext = () => {
    switch (periodType) {
      case 'month':
        return setCurrentDate((prev) => addMonths(prev, 1));
      default:
        break;
    }
  };

  return {
    currentDate,
    moveDatePrev,
    moveDateNext,
  };
}
