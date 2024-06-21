import React from 'react';
import PropertyList from '../components/PropertyList';
import { authService } from '../services/authService';
import Login from '../components/Login';
function HomePage() {      
    const isAuthenticated = authService.isAuthenticated();

  return (
    <div style={{padding:"50px"}}>
        
            <>
            <h1 style={{ fontSize:"50px", color:"teal"}}>Find your next perfect</h1>
            <h1 style={{ fontSize:"50px", color:"grey", margin:"-40px 0px 50px 0"}}>place with ease</h1>

            <p style={{color:"burlywood"}}>Broker Bricks will help you find your home fast, easy and comfortable.<br></br>
            Our expert support are always available.</p>
            
            </>
            
           
        
            <><PropertyList />
                
            </>
        
      
    </div>
  );
}

export default HomePage;