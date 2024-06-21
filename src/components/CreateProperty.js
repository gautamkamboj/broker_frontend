import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { propertyService } from '../services/propertyService';

function CreateProperty() {
  const navigate = useNavigate();
  const [isLoading,setIsLoading]=useState(false);
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

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setFormData((prevState) => ({
      ...prevState,
      images: [...prevState.images, ...files],
    }));
    console.log(formData)
  };
  const handleRemoveFile = (index) => {
    setFormData(prevState => ({
      ...prevState,
      images: prevState.images.filter((_, i) => i !== index)
    }));
  };
  const handleSubmit = async (event) => {
    setIsLoading(true)
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
      if(formDataWithImages)
        await propertyService.createProperty(formDataWithImages);
      else
        return(<>Try Again </>)
      navigate('/user-properties');
    } catch (error) {
      console.error('Error creating property:', error);
    }
  };

  return (
    <div>
    {isLoading ? <h2 style={{textAlign:"center"}}> Loading...</h2>: 
    
    <div style={{textAlign:"center"}}>
    <h2>Create a Listing</h2>
    <form style={{display:"flex", justifyContent:"center"}} onSubmit={handleSubmit} className='propdetails'>
      <div >
      <div>
        
        <input
          type="text"
          id="propertyName"
          name="propertyName"
          required
          placeholder="propertyName"
          value={formData.propertyName}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <input
          type="text"
          id="address"
          required
          placeholder="address"
          name="address"

          value={formData.address}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <textarea
          id="description"
          placeholder="description"
          name="description"

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
          required
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
<button type="submit">Create Property</button>
</div>
      
    </form>
  </div> 
}
</div>
  );
}

export default CreateProperty;