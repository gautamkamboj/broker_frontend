import React, { useState } from 'react';
import { authService } from '../services/authService';
import { useEffect } from 'react';
import { propertyService } from '../services/propertyService';

function HomePage() {      
    const isAuthenticated = authService.isAuthenticated();
   const [msg,setMsg] = useState([]);

    useEffect(() => {
    const getMessage = async () => {
        try {
          const message = await propertyService.getMessage();
        console.log(message)
         setMsg(message.messages)
        } catch (error) {
          console.error('Error getting message:', error);
        }
    }
    getMessage();
},[])

  return (
    <div>
        {isAuthenticated && (
            <>
            <h1>Messages</h1>
            
            {msg.length !== 0 ? msg.map((msg)=>(
                 <div style={{border:"1px solid black", margin:"10px 5px", borderRadius:"10px", padding:"5px"}}>
                    <h2>{msg.sender.username}</h2>
                    <p>Property: {msg.property?.propertyName}</p>
                    
                     <p>{msg.content}</p>
                </div>
                
            )
           

            ):<h2>No Message</h2>
        }
            </>
            
            )}
        
      
    </div>
  );
}

export default HomePage;