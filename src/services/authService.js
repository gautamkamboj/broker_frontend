import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1/user';

const register = async (username, password) => {
  try {
    await axios.post(`${API_URL}/register`, { username, password });
  } catch (error) {
    throw new Error('Error registering user');
  }
};

const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    const { token } = response.data;
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
  } catch (error) {
    throw new Error('Error logging in');
  }
};

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('username')
};

const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token;
};

const getUserId = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return null;
  }

  const decoded = JSON.parse(atob(token.split('.')[1]));
  
  return decoded.userId;
};



export const authService = {
  register,
  login,
  logout,
  isAuthenticated,
  getUserId,
};