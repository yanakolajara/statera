import AxiosInstance from './axios';

export const getAllTransactions = () =>
  AxiosInstance.get('/transactions')
    .then((response) => response.data)
    .catch((error) => {
      throw error.response?.data || error.message;
    });

export const getTransaction = (transactionId) =>
  AxiosInstance.get(`/transactions/${transactionId}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response?.data || error.message;
    });

export const getUserTransactions = (userId) =>
  AxiosInstance.get(`/transactions/user/${userId}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response?.data || error.message;
    });

export const createTransaction = (transactionData) =>
  AxiosInstance.post('/transactions', transactionData)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response?.data || error.message;
    });

export const updateTransaction = (transactionId, transactionData) =>
  AxiosInstance.put(`/transactions/${transactionId}`, transactionData)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response?.data || error.message;
    });

export const deleteTransaction = (transactionId) =>
  AxiosInstance.delete(`/transactions/${transactionId}`)
    .then(() => true)
    .catch((error) => {
      throw error.response?.data || error.message;
    });
