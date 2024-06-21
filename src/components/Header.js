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
    <header style={{display:"flex", justifyContent:"space-between"}}>
        <Link to={'/'}  style={{textDecoration:"none", color:"transparent"}}>
            <div style={{display:"flex"}}>
                <p style={{color:"red", fontSize:"20px", fontStyle:"italic"}}>BROKER</p>
                <p style={{ fontSize:"20px", fontStyle:"italic", color:"white"}}>BRICKS</p>
                <p style={{color:"red", fontSize:"20px", fontStyle:"italic"}}>.com</p>
            </div>
        </Link>
      <nav style={{display:"flex", alignItems:"center"}}>
        <ul>
          
          {isAuthenticated && (
            <>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/user-properties">My Properties</Link></li>
              <li><Link to="/create-property">Create Property</Link></li>
              <li><Link to="/messages">Messages</Link></li>
              <li>User: { localStorage.getItem('username')}</li>
              <li><button onClick={handleLogout}>Logout</button></li>
            </>
          )}
          {!isAuthenticated && (
            <>
              <li><Link to="/login">Login</Link></li>
              
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;