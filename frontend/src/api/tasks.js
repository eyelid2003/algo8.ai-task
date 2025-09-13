import axios from 'axios';
import { TASKS_API_URL } from './config';
import { jwtDecode } from 'jwt-decode';

const getAuthHeaders = () => ({
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

export const getTasks = async (status = '', page = 1, limit = 10) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('User not authenticated');

  const decodedToken = jwtDecode(token);
  const userId = decodedToken.id;

  try {
    const response = await axios.get(
    
      `${TASKS_API_URL}/tasks?status=${status}&page=${page}&limit=${limit}&userId=${userId}`,
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    } else if (error.request) {
      throw new Error('No response from server. Check your network.');
    } else {
      throw new Error('Unexpected error occurred. Try again.');
    }
  }
};

export const createTask = async (task) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('User not authenticated');

  const decodedToken = jwtDecode(token);
  const userId = decodedToken.id;

  const taskWithUser = {
    ...task,
    user: userId, 
  };

  try {
    const response = await axios.post(`${TASKS_API_URL}/tasks`, taskWithUser, getAuthHeaders());
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    } else if (error.request) {
      throw new Error('No response from server. Check your network.');
    } else {
      throw new Error('Unexpected error occurred. Try again.');
    }
  }
};


export const updateTask = async (taskId, updatedTask) => {
  try {
    const response = await axios.put(`${TASKS_API_URL}/tasks/${taskId}`, updatedTask, getAuthHeaders());
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    } else if (error.request) {
      throw new Error('No response from server. Check your network.');
    } else {
      throw new Error('Unexpected error occurred. Try again.');
    }
  }
};

export const deleteTask = async (taskId) => {
  try {
    const response = await axios.delete(`${TASKS_API_URL}/tasks/${taskId}`, getAuthHeaders());
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    } else if (error.request) {
      throw new Error('No response from server. Check your network.');
    } else {
      throw new Error('Unexpected error occurred. Try again.');
    }
  }
};