import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { propertyService } from '../services/propertyService';
import { authService } from '../services/authService';
import ReactSimplyCarousel from 'react-simply-carousel';
function PropertyDetailPage() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [message, setMessage] = useState('');
  const isAuthenticated = authService.isAuthenticated();
  const userId = authService.getUserId();
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const [properties, setProperties] = useState([]);

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
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const data = await propertyService.getPropertyById(id);
        setProperty(data?.properties[0]);
       
        console.log(userId)
      } catch (error) {
        console.error('Error fetching property:', error);
      }
    };

    fetchProperty();
  }, [id]);

  const handleSendMessage = async () => {
    try {
      await propertyService.sendMessage(id, message);
      setMessage('');
      alert('Message sent successfully');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

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

  if (!property) {
    return <div>Loading...</div>;
  }

  return (
    <div> 
          <ReactSimplyCarousel
        activeSlideIndex={activeSlideIndex}
        onRequestChange={setActiveSlideIndex}
        itemsToShow={1}
        itemsToScroll={1}
        forwardBtnProps={{
          //here you can also pass className, or any other button element attributes
          style: {
            alignSelf: 'center',
            background: 'black',
            border: 'none',
            borderRadius: '50%',
            color: 'white',
            cursor: 'pointer',
            fontSize: '20px',
            height: 30,
            lineHeight: 1,
            textAlign: 'center',
            width: 30,
          },
          children: <span>{`>`}</span>,
        }}
        backwardBtnProps={{
          //here you can also pass className, or any other button element attributes
          style: {
            alignSelf: 'center',
            background: 'black',
            border: 'none',
            borderRadius: '50%',
            color: 'white',
            cursor: 'pointer',
            fontSize: '20px',
            height: 30,
            lineHeight: 1,
            textAlign: 'center',
            width: 30,
          },
          children: <span>{`<`}</span>,
        }}
        responsiveProps={[
          {
            itemsToShow: 1,
            itemsToScroll: 1,
            minWidth: 768,
          },
        ]}
        speed={400}
        easing="linear"
      >
        {property.images?.map((image, index) => (
      <img key={index} src={image} style={{ width: 1200, height: 300, background: '#ff80ed' }} alt={`Property ${index}`} />
    ))}
    
    </ReactSimplyCarousel>
    
      <div style={{ textAlign:"center" }}>
        <h2>{property.propertyName} - ₹{property.price}</h2>
        <p>Address: {property.address}</p>
        <p>{property.description}</p>
        <p>{property.type === "sell"? "For Sale" : "For Rent"}</p>
       

        <p> {property.furnished && <>Furnished</>} {property.parking && <>Parking</>}</p>
 <p>Owner: {property.owner._id === userId ? <>me</> : <>{property.owner.username}</>}</p>
        {isAuthenticated && property.owner._id === userId && (
        <Link style={{margin:'10px'}} to={`/edit-property/${id}`}><button>Update Property</button><button onClick={() => handleDeleteProperty(property._id)}>
        Delete
      </button></Link>
      )}
      
      
        {isAuthenticated && property.owner._id !== userId && (
        <div style={{display:"flex", justifyContent:"center"}}>
          <h3>Contact Owner</h3>
          <textarea
            placeholder='Send Message'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      )}
      </div>
      
      
     
    </div>
  );
}

export default PropertyDetailPage;