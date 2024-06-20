import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import UserPropertiesPage from './pages/UserPropertiesPage';
import PropertyDetailPage from './pages/PropertyDetailPage';
import CreateProperty from './components/CreateProperty';
import EditProperty from './components/EditProperty';
import Login from './components/Login';
import Register from './components/Register';
import PrivateRoute from './components/PrivateRoute';
import Messages from './pages/Messages'
function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/user-properties" element={<PrivateRoute><UserPropertiesPage /></PrivateRoute>} />
          <Route path="/property/:id" element={<PropertyDetailPage />} />
          <Route path="/create-property" element={<PrivateRoute><CreateProperty /></PrivateRoute>} />
          <Route path="/edit-property/:id" element={<PrivateRoute><EditProperty /></PrivateRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/messages" element={<PrivateRoute><Messages/></PrivateRoute>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;