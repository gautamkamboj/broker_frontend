// components/PropertyList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { propertyService } from '../services/propertyService';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import houseImg from '../house.jpg'
function PropertyList() {
  const [properties, setProperties] = useState([]);

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

  return (
    <div className="property-list">
      <TransitionGroup component={null}>
        {properties.map((property) => (
          <CSSTransition key={property._id} timeout={300} classNames="fade">
            <div className="property-card">
              <Link style={{textDecoration:"none"}}  to={`/property/${property._id}`}>
              <h3 >{property.propertyName}</h3>
              
              {property.images[0] ? <img src={property.images[0]} alt={property.propertyName} /> : <img src={houseImg}/>}
              
              <p>{property.type === "sell"? "For Sale" : "For Rent"} - ₹{property.price}</p>
              <p>{property.address}</p>
              </Link>
              
            </div>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
}

export default PropertyList;