import { useState } from 'react';
import {
  getMonthRange,
  getWeekRange,
  getBiWeeklyRange,
  isWithinRange,
} from '../utils/date.utils';

export function useDate() {
  const [currentDate, setCurrentDate] = useState(new Date());

  return {
    currentDate,
  };
}
