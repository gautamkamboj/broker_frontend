import axios from 'axios';
import { authService } from './authService';

const API_URL = 'https://broker-backend-9ksr.onrender.com/api/v1/property';

const getProperties = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/list`, {
        headers: {
          Authorization: `Bearer ${token}`,
            },
        }
    );
    return response.data;
  } catch (error) {
    throw new Error('Error fetching propertiesssssss');
  }
};

const getUserProperties = async (userId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/myListing`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        userId,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error fetching user properties');
  }
};

const getPropertyById = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/search/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
       
      });
    return response.data;
  } catch (error) {
    throw new Error('Error fetching property');
  }
};

const createProperty = async (formData) => {
  try {
    const token = localStorage.getItem('token');
    await axios.post(`${API_URL}/create`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (error) {
    throw new Error('Error creating property');
  }
};

const updateProperty = async (id, formData) => {
  try {
    const token = localStorage.getItem('token');
    await axios.put(`${API_URL}/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (error) {
    throw new Error('Error updating property');
  }
};

const deleteProperty = async (id) => {
  try {
    const token = localStorage.getItem('token');
    await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw new Error('Error deleting property');
  }
};

const sendMessage = async (propertyId, content) => {
  try {
    const token = localStorage.getItem('token');
    const userId = authService.getUserId();
    await axios.post(
      `https://broker-backend-9ksr.onrender.com/api/v1/message/send`,
      { propertyId, content },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    throw new Error('Error sending message');
  }
};

const getMessage = async () => {
    try {
      const token = localStorage.getItem('token');
      const userId = authService.getUserId();

      const response = await axios.get(
        `https://broker-backend-9ksr.onrender.com/api/v1/message/get`
        ,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
        
      );
      return response.data
    } catch (error) {
      throw new Error('Error getting message');
    }
  };

  const deleteMessage = async (messageId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`https://broker-backend-9ksr.onrender.com/api/v1/message/${messageId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      throw new Error('Error deleting message');
    }
  };


export const propertyService = {
  getProperties,
  getUserProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
  sendMessage,
  getMessage,
  deleteMessage
};