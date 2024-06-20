// components/Header.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

function Header() {
  const navigate = useNavigate();
  const isAuthenticated = authService.isAuthenticated();
  const userId = authService.getUserId();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <header>
      <nav>
        <ul>
          
          {isAuthenticated && (
            <>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/user-properties">My Properties</Link></li>
              <li><Link to="/create-property">Create Property</Link></li>
              <li><button onClick={handleLogout}>Logout</button></li>
              <li><Link to="/messages">Messages</Link></li>
              <li>{ localStorage.getItem('username')}</li>
            </>
          )}
          {!isAuthenticated && (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;