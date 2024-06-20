import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { propertyService } from '../services/propertyService';

function EditProperty() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    propertyName: '',
    address: '',
    description: '',
    type: 'rent',
    price: 0,
    furnished: false,
    parking: false,
    images: [],
  });
  const [invalid, setInvalid] = useState("");

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const data = await propertyService.getPropertyById(id);
        setFormData(data?.properties[0]);
      } catch (error) {
        console.error('Error fetching property:', error);
      }
    };

    fetchProperty();
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleRemoveFile = (index) => {
    setFormData(prevState => ({
      ...prevState,
      images: prevState.images.filter((_, i) => i !== index)
    }));
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setFormData((prevState) => ({
      ...prevState,
      images: [...prevState.images, ...files],
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const formDataWithImages = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'images') {
          for (const image of value) {
            formDataWithImages.append('images', image);
          }
        } else {
          formDataWithImages.append(key, value);
        }
      });

      await propertyService.updateProperty(id, formDataWithImages);
      setInvalid("");
      navigate('/user-properties');
      

    } catch (error) {
        setInvalid("Format Not Supported");
      console.error('Error updating property:', error);
    }
    
  };

  return (
    <div style={{textAlign:"center"}}>
    <h2>Update Property Details</h2>
    <form style={{display:"flex", justifyContent:"center"}} onSubmit={handleSubmit} className='propdetails'>
      <div >
      <div>
        
        <input
          type="text"
          id="propertyName"
          placeholder="propertyName"
          value={formData.propertyName}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <input
          type="text"
          id="address"
          placeholder="address"
          value={formData.address}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <textarea
          id="description"
          placeholder="description"
          value={formData.description}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="type">Type</label>
        <select
          id="type"
          name="type"
          value={formData.type}
          onChange={handleInputChange}
        >
          <option value="rent">Rent</option>
          <option value="sell">Sell</option>
        </select>
      </div>
      <div>
        <label htmlFor="price">Price</label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="furnished">Furnished</label>
        <input
          type="checkbox"
          id="furnished"
          name="furnished"
          checked={formData.furnished}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="parking">Parking</label>
        <input
          type="checkbox"
          id="parking"
          name="parking"
          checked={formData.parking}
          onChange={handleInputChange}
        />
      </div>
      </div>
      <div>
<label htmlFor="images">Images</label>
<input
  type="file"
  id="images"
  name="images"
  multiple
  onChange={handleFileChange}
/>
{formData.images.map((img, index) => (
  <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
    <h5 style={{ margin: '0 10px 0 0' }}>{img.name}</h5>
    <button 
      type="button" 
      onClick={() => handleRemoveFile(index)}
      style={{
        backgroundColor: '#ff4d4d',
        color: 'white',
        border: 'none',
        padding: '5px 10px',
        borderRadius: '3px',
        cursor: 'pointer'
      }}
    >
      Remove
    </button>
  </div>
))}
<button type="submit">Update</button>
</div>
      
    </form>
  </div>
  );
}

export default EditProperty;