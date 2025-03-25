import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const CreateCategory = () => {
  const [categories, setCategories] = useState([]); 

  // Get all categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('auth'))?.token; // Retrieve token from local storage
        const { data } = await axios.get('http://localhost:3000/api/v1/category/getAllCategories', {
          headers: {
            Authorization: `${token}`, // Include the token in the Authorization header
          },
        });
        console.log(data);
        setCategories(data.categories); // Assuming the API response contains a `categories` array
      } catch (error) {
        toast.error('Error fetching categories!');
        console.error(error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="category-container">
      <h2 className="category-title">Existing Categories</h2>
      <ul className="category-list">
        {categories?.map((category, index) => (
          <li key={index} className="category-item">
            <span className="category-name">{category}</span>
            <button className="edit-button" onClick={() => handleEdit(category)}>
              Edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CreateCategory;