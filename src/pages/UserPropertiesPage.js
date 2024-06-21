import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { propertyService } from '../services/propertyService';
import { authService } from '../services/authService';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import houseImg from '../house.jpg'
function UserPropertiesPage() {
  const [properties, setProperties] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchUserProperties = async () => {
      try {
        const userId = authService.getUserId();
        const data = await propertyService.getUserProperties(userId);
        setProperties(data.properties);
      } catch (error) {
        console.error('Error fetching user properties:', error);
      }
    };

    fetchUserProperties();
  }, []);

  const handleDeleteProperty = async (propertyId) => {
    try {
      await propertyService.deleteProperty(propertyId);
      setProperties((prevProperties) =>
        prevProperties.filter((property) => property._id !== propertyId)
      );
    } catch (error) {
      console.error('Error deleting property:', error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProperties = properties.filter((property) =>
    property.propertyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div> 
        <h2>My Properties</h2>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name, address, or description"
          value={searchTerm}
          onChange={handleSearch}
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '20px',
            borderRadius: '5px',
            border: '1px solid #ccc'
          }}
        />
      </div>
        <div className="property-list">
      <TransitionGroup component={null}>
        {filteredProperties.map((property) => (
          <CSSTransition key={property._id} timeout={300} classNames="fade">
            <div className="property-card">
              <Link to={`/property/${property._id}` } style={{textDecoration:"none", textWrap:"wrap"}}>
              <h3>{property.propertyName}</h3>
              {property.images[0] ? <img src={property.images[0]} alt={property.propertyName} /> : <img src={houseImg}/>}
             </Link>
              
              <button onClick={() => handleDeleteProperty(property._id)}>
              Delete
            </button>
            <Link to={`/edit-property/${property._id}`}><button>Edit</button></Link>
            </div>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
     
    
    </div>
  );
}

export default UserPropertiesPage;