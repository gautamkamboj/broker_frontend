import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { Link } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
const [invalidUser, setInvalidUser] =useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await authService.login(formData.username, formData.password);
      navigate('/');
    } catch (error) {
        setInvalidUser("Username or Password Incorrect");
      console.error('Error logging in:', error);
    }
  };

  return (
    <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <br></br>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </div>
        <br></br>
        <div>
          <label htmlFor="password">Password</label>
          <br></br>
          
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <p style={{color:"red"}}>
            {invalidUser}
        </p>
        
        <button type="submit">Login</button>
      </form>
      <br></br>
      <Link to={"/register"}>Register</Link>
    </div>
  );
}

export default Login;