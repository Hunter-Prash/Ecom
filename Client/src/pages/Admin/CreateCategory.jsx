import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const CreateCategory = () => {
  const [categories, setCategories] = useState([]); 
  const [categoryName, setCategoryName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = JSON.parse(localStorage.getItem('auth'))?.token; // Retrieve token from local storage
      const response = await axios.post(
        'http://localhost:3000/api/v1/category/create',
        { name: categoryName }, // Request body
        {
          headers: {
            Authorization: `${token}`, // Correctly include the token in the headers
          },
        }
      );
      console.log(response.data);
      toast.success('Category created successfully!');
      setCategoryName(''); // Clear the input field after successful creation
      window.location.reload(); // Reload the page to fetch the updated list of categories
    } catch (error) {
      toast.error('Error creating category!');
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = JSON.parse(localStorage.getItem('auth'))?.token; // Retrieve token from local storage
      const response = await axios.delete(`http://localhost:3000/api/v1/category/delete/${id}`, {
        headers: {
          Authorization: `${token}`, // Include the token in the Authorization header
        },
      });
      console.log(response.data);
      toast.success('Category deleted successfully!');
      // Update the categories list without reloading the page
      window.location.reload(); // Reload the page to fetch the updated list of categories
    } catch (error) {
      toast.error('Error deleting category!');
      console.error(error);
    }
  };


    // Handle Edit Category
    const handleEdit = async (category) => {
      const newName = prompt("Enter new category name:", category.name);
      console.log("Updating category:", category._id, "New Name:", newName);

      if (!newName || newName === category.name) return; // No change or cancelled
  
      try {
        const token = JSON.parse(localStorage.getItem("auth"))?.token;
        const response = await axios.put(
          `http://localhost:3000/api/v1/category/update/${category._id}`,
          { name: newName },
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        console.log(response.data);
        toast.success("Category updated successfully!");
        window.location.reload(); // Reload the page to fetch the updated list of categories
      } catch (error) {
        toast.error("Error updating category!");
        console.error(error);
      }
    };

    

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
        console.log(data.result);
        setCategories(data.result); // Assuming the API response contains a `categories` array
      } catch (error) {
        toast.error('Error fetching categories!');
        console.error(error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="category-container">
      <h2 className="category-title">Create Category</h2>
      <form className="category-form">
        <input text='text' placeholder='Category name' value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
        <button type='submit' onClick={handleSubmit}>Create</button>
      </form>

      <h2 className="category-title">Existing Categories</h2>
      <ul className="category-list">
        {categories?.map((category, index) => (
          <li key={index} className="category-item">
            <span className="category-name">{category.name}</span>
            <button className="edit-button" onClick={() => handleEdit(category)}>
              Edit
            </button>
            <button className="delete-button" onClick={() => handleDelete(category._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CreateCategory;