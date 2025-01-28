import { useState, useEffect } from 'react';
import { addMonths, subMonths } from 'date-fns';
import { useAuth } from './useAuth';
import {
  getUserTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from '../api/transactions';
import { getMonthRange } from '../utils/date.utils';

export function useTransactions() {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    if (user) {
      fetchTransactions().then(() => {
        console.log(transactions);
      });
    }
  }, [user, selectedDate]); // Add selectedDate as dependency

  const fetchTransactions = () => {
    setLoading(true);
    const { startDate, endDate } = getMonthRange(selectedDate);
    return getUserTransactions(user.uid, startDate, endDate)
      .then((data) => setTransactions(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  const addTransaction = (transactionData) => {
    setLoading(true);
    return createTransaction(user.uid, transactionData)
      .then(() => fetchTransactions())
      .catch((err) => err)
      .finally(() => setLoading(false));
  };

  const editTransaction = (transactionId, transactionData) => {
    setLoading(true);
    return updateTransaction(transactionId, transactionData)
      .then(() => fetchTransactions())
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  const removeTransaction = (transactionId) => {
    setLoading(true);
    return deleteTransaction(transactionId)
      .then(() => fetchTransactions())
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  const nextMonth = () => {
    setSelectedDate((prev) => addMonths(prev, 1));
  };

  const prevMonth = () => {
    setSelectedDate((prev) => subMonths(prev, 1));
  };

  return {
    transactions,
    loading,
    nextMonth,
    prevMonth,
    selectedDate,
    addTransaction,
    editTransaction,
    removeTransaction,
    refreshTransactions: fetchTransactions,
  };
}
