import { useState } from 'react';

export function useDate() {
  // Get the first and last day of the current month
  const getCurrentMonthRange = () => {
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    return { startDate: firstDay, endDate: lastDay };
  };

  const [dateRange, setDateRange] = useState(getCurrentMonthRange());

  // Navigate to previous month
  const goToPreviousMonth = () => {
    setDateRange(({ startDate }) => {
      const previousMonth = new Date(startDate);
      previousMonth.setMonth(previousMonth.getMonth() - 1);
      return {
        startDate: new Date(
          previousMonth.getFullYear(),
          previousMonth.getMonth(),
          1
        ),
        endDate: new Date(
          previousMonth.getFullYear(),
          previousMonth.getMonth() + 1,
          0
        ),
      };
    });
  };

  // Navigate to next month
  const goToNextMonth = () => {
    setDateRange(({ startDate }) => {
      const nextMonth = new Date(startDate);
      nextMonth.setMonth(nextMonth.getMonth() + 1);
      return {
        startDate: new Date(nextMonth.getFullYear(), nextMonth.getMonth(), 1),
        endDate: new Date(nextMonth.getFullYear(), nextMonth.getMonth() + 1, 0),
      };
    });
  };

  // Reset to current month
  const resetToCurrentMonth = () => {
    setDateRange(getCurrentMonthRange());
  };

  // Function to check if a date falls within the current range
  const isWithinRange = (date) => {
    const checkDate = new Date(date);
    return checkDate >= dateRange.startDate && checkDate <= dateRange.endDate;
  };

  return {
    dateRange,
    goToPreviousMonth,
    goToNextMonth,
    resetToCurrentMonth,
    isWithinRange,
  };
}
