import AxiosInstance from './axios';

export const getAllUsers = () =>
  AxiosInstance.get('/users')
    .then((response) => response.data)
    .catch((error) => {
      throw error.response?.data || error.message;
    });

export const getUserById = (userId) =>
  AxiosInstance.get(`/users/${userId}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response?.data || error.message;
    });

export const createUser = (userData) =>
  AxiosInstance.post('/users', userData)
    .then((response) => response.data)
    .catch((error) => {
      console.log('axios/createUser/error: ', error);
      throw error.response?.data || error.message;
    });

export const updateUser = (userId, userData) =>
  AxiosInstance.put(`/users/${userId}`, userData)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response?.data || error.message;
    });

export const deleteUser = (userId) =>
  AxiosInstance.delete(`/users/${userId}`)
    .then(() => true)
    .catch((error) => {
      throw error.response?.data || error.message;
    });
