import jwt from 'jsonwebtoken';

export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return false;
  }

  try {
    const decoded = jwt.verify(token, 'qwertyuiop');
    return !!decoded;
  } catch (error) {
    return false;
  }
};