import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const CreateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(''); // State to track the selected category
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [shipping, setShipping] = useState(false);
  const [photo, setPhoto] = useState(null); // State to track the uploaded photo

  const navigate = useNavigate();
  
  // Get all categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('auth'))?.token;
        const { data } = await axios.get('http://localhost:3000/api/v1/category/getAllCategories', {
          headers: {
            Authorization: `${token}`,
          },
        });
        console.log(data);
        setCategories(data.result); // Assuming `data.result` contains the categories array
      } catch (err) {
        console.error(err);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = JSON.parse(localStorage.getItem('auth'))?.token;

      // Create FormData to send the photo and other product details
      //The FormData API is used to construct a set of key-value pairs representing form fields and their values. It is commonly used when handling file uploads along with other form inputs in multipart form submissions

      //Important: The key must match the field name expected in the backend API for handling file uploads.
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('quantity', quantity);
      formData.append('shipping', shipping);
      formData.append('category', selectedCategory);
      if (photo) {
        formData.append('photo', photo); // Append the photo file
      }

      const response = await axios.post('http://localhost:3000/api/v1/products/create', formData, {
        headers: {
          Authorization: `${token}`,
          'Content-Type': 'multipart/form-data', // Set the content type for file upload
        },
      });

      console.log(response.data);
      toast.success('Product created successfully!');

      //navigate to products page after successful creation
      
      setTimeout(() => {
        navigate('/dashboard/admin/products'); // Redirect to the products page after successful creation
      }, 1000);
     

    } catch (err) {
      console.error(err);
      toast.error('Error creating product!');
    }
  };

  return (
    <div className="create-product-container">
      <h2>Create Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Product Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="shipping">Shipping</label>
          <select
            id="shipping"
            value={shipping}
            onChange={(e) => setShipping(e.target.value === 'true')}
          >
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)} // This should store _id, not name
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>{/*when submitting the form the backend expects a ._id as a mapping of the product to its category so we set the value={category._id}*/ }
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="photo">Photo</label>
          <input
            type="file"
            id="photo"
            accept="image/*"
            onChange={(e) => setPhoto(e.target.files[0])} // Set the selected photo file
          />
        </div>

        <button type="submit">Create Product</button>
        <button className='mc' onClick={() => { navigate('/dashboard/admin/products'); }}>Go to product Page</button>
      </form>
    </div>
  );
};

export default CreateProduct;