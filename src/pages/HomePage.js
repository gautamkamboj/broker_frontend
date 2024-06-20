import React from 'react';
import PropertyList from '../components/PropertyList';
import { authService } from '../services/authService';
import Login from '../components/Login';
function HomePage() {      
    const isAuthenticated = authService.isAuthenticated();

  return (
    <div>
        {isAuthenticated && (
            <>
            <h1>Home</h1>
            <PropertyList />
            </>
            
            )}
        {!isAuthenticated && (
            <>
                <Login/>
            </>
        )}
      
    </div>
  );
}

export default HomePage;