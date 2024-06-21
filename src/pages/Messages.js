import React, { useState } from 'react';
import { authService } from '../services/authService';
import { useEffect } from 'react';
import { propertyService } from '../services/propertyService';

function Messages() {      
    const isAuthenticated = authService.isAuthenticated();
   const [msg,setMsg] = useState([]);

    useEffect(() => {
    
    getMessage();
},[])
const getMessage = async () => {
    try {
      const message = await propertyService.getMessage();
     setMsg(message.messages)
    } catch (error) {
      console.error('Error getting message:', error);
    }
}
const handleDeleteMessage = async (messageId) => {
    try {
      await propertyService.deleteMessage(messageId);
      // Refresh the messages after deletion
      getMessage();
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  return (
    <div>
    <h2>Messages</h2>
    {msg.map((message) => (
      <div key={message._id} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc' }}>
        <p><strong>From:</strong> {message.sender.username}</p>
        <p><strong>Property:</strong> {message.property?.propertyName}</p>
        <p><strong>Content:</strong> {message.content}</p>
        <p><strong>Date:</strong> {new Date(message.createdAt).toLocaleString()}</p>
        <button 
          onClick={() => handleDeleteMessage(message._id)}
          style={{
            backgroundColor: '#ff4d4d',
            color: 'white',
            border: 'none',
            padding: '5px 10px',
            borderRadius: '3px',
            cursor: 'pointer'
          }}
        >
          Delete
        </button>
      </div>
    ))}
  </div>
);
}

export default Messages;