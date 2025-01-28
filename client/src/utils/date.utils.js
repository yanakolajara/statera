//* Date Formatting

import { MONTHS } from '../constants/months';

export const getMonth = (dateString = '') => {
  const date = new Date(dateString);

  return MONTHS[date.getMonth()];
};

export const getDate = (dateString = '') => {
  const date = new Date(dateString);
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
};

export const getMonthRange = (selectedDate) => {
  const date = new Date(selectedDate);
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return { startDate: firstDay, endDate: lastDay };
};

export const getWeekRange = (selectedDate) => {
  const date = new Date(selectedDate);
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1); // Adjust for Sunday
  const startDate = new Date(date.setDate(diff));
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6);
  return { startDate, endDate };
};

export const getBiWeeklyRange = (selectedDate) => {
  const date = new Date(selectedDate);
  const dayOfMonth = date.getDate();
  const lastDayOfMonth = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();
  const midMonth = Math.ceil(lastDayOfMonth / 2);

  if (dayOfMonth <= midMonth) {
    const startDate = new Date(date.getFullYear(), date.getMonth(), 1);
    const endDate = new Date(date.getFullYear(), date.getMonth(), midMonth);
    return { startDate, endDate };
  } else {
    const startDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      midMonth + 1
    );
    const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return { startDate, endDate };
  }
};

export const isWithinRange = (date, range) => {
  const checkDate = new Date(date);
  return checkDate >= range.startDate && checkDate <= range.endDate;
};
