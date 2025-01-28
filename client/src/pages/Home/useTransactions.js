import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useDate } from '../../hooks/useDate';
import {
  // getAllTransactions,
  getUserTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from '../../api/transactions';

export function useTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const {
    dateRange,
    goToPreviousMonth,
    goToNextMonth,
    resetToCurrentMonth,
    isWithinRange,
  } = useDate();

  const fetchTransactions = () => {
    setLoading(true);
    return getUserTransactions(user.uid)
      .then((data) => {
        setTransactions(data);
        console.log(transactions);
      })
      .catch((err) => {
        console.error(err);
        setTransactions([]);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (user) {
      console.log('Fetch!');
      fetchTransactions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const addTransaction = (transactionData) => {
    setLoading(true);
    return createTransaction(user.uid, transactionData)
      .then((newTransaction) => {
        setTransactions((prev) => [...prev, newTransaction]);

        return newTransaction;
      })
      .catch((err) => {
        console.error(err);
        throw err;
      })
      .finally(() => setLoading(false));
  };

  const editTransaction = (transactionId, transactionData) => {
    setLoading(true);
    return updateTransaction(transactionId, transactionData)
      .then((updatedTransaction) => {
        setTransactions((prev) =>
          prev.map((transaction) =>
            transaction.id === transactionId ? updatedTransaction : transaction
          )
        );

        return updatedTransaction;
      })
      .catch((err) => {
        console.error(err);
        throw err;
      })
      .finally(() => setLoading(false));
  };

  const removeTransaction = (transactionId) => {
    setLoading(true);
    return deleteTransaction(transactionId)
      .then(() => {
        setTransactions((prev) =>
          prev.filter((transaction) => transaction.id !== transactionId)
        );
      })
      .catch((err) => {
        console.error(err);
        throw err;
      })
      .finally(() => setLoading(false));
  };

  const filteredTransactions = transactions.filter((transaction) =>
    isWithinRange(transaction.date)
  );

  return {
    transactions: filteredTransactions,
    loading,
    addTransaction,
    editTransaction,
    removeTransaction,
    refreshTransactions: fetchTransactions,
    goToPreviousMonth,
    goToNextMonth,
    resetToCurrentMonth,
    dateRange,
  };
}
