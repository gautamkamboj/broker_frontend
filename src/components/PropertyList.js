import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { propertyService } from '../services/propertyService';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import houseImg from '../house.jpg'; // Ensure this path is correct
import { authService } from '../services/authService';

function PropertyList() {
  const [properties, setProperties] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const isAuthenticated = authService.isAuthenticated();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await propertyService.getProperties();
        setProperties(data.properties);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    fetchProperties();
  }, []);

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
                
                <Link style={{textDecoration:"none"}} to={isAuthenticated ? `/property/${property._id}` : '/login'}>
                  <h3>{property.propertyName}</h3>
                  {property.images[0] ? 
                    <img src={property.images[0]} alt={property.propertyName} /> : 
                    <img src={houseImg} alt="Default house"/>
                  }
                   <p>{property.type === "sell"? "For Sale" : "For Rent"} - ₹{property.price}</p>
                   <p>{property.address}</p>
                </Link>
              </div>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
    </div>
  );
}

export default PropertyList;