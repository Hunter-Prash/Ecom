import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/context.jsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]); // State for filtered products
  const [categories, setCategories] = useState([]); // State for categories
  const [selectedCategories, setSelectedCategories] = useState([]); // State for selected categories


  //these states are used to implement pagination which is done using server side code
  const[total,setTotal] = useState(0); // Total number of products
  const [page,setPage] = useState(2); // Current page number
  useEffect(()=>{
    const getTotalProducts = async () => {
      try{
        const {data}= await axios.get('http://localhost:3000/api/v1/products/product-count');
        //console.log(data);
        setTotal(data.total); // Set the total number of products
      }catch(err){
        console.error(err);
      }
  
    }  
    getTotalProducts();
  },[])
  
  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      const token = JSON.parse(localStorage.getItem('auth'))?.token;
      try {
        const { data } = await axios.get('http://localhost:3000/api/v1/products/get', {
          headers: {
            Authorization: `${token}`,
          },
        });
        console.log(data);
        setProducts(data.result);
        const temp=data.result.slice(0,5); // Initially show only 5 products
        setFilteredProducts(temp); // Set initial filtered products to first 5 products
       // setFilteredProducts(data.result); // Initially, show all products
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      const token = JSON.parse(localStorage.getItem('auth'))?.token;
      try {
        const { data } = await axios.get('http://localhost:3000/api/v1/category/getAllCategories', {
          headers: {
            Authorization: `${token}`,
          },
        });
        console.log(data);
        setCategories(data.result);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  // Handle checkbox change
  const handleCheckboxChange = (categoryId) => {
    const updatedSelectedCategories = selectedCategories.includes(categoryId)
      ? selectedCategories.filter((id) => id !== categoryId) // Remove category if already selected
      : [...selectedCategories, categoryId]; // Add category if not selected

    setSelectedCategories(updatedSelectedCategories);

    // Filter products based on selected categories
    if (updatedSelectedCategories.length === 0) {
      setFilteredProducts(products); // Show all products if no category is selected
    } else {
      const filtered = products.filter((product) =>
        updatedSelectedCategories.includes(product.category._id)
      );
      setFilteredProducts(filtered);
    }
  };

  const handleReset = () => {
    setSelectedCategories([]); // Reset selected categories
    setFilteredProducts(products); // Show all products again
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => (checkbox.checked = false)); // Uncheck all checkboxes
  }

  //used to click on the product and navigate to the single product page
  const handleClick = async (id) => {
    const token = JSON.parse(localStorage.getItem('auth'))?.token;
    try {
      const { data } = await axios.get(`http://localhost:3000/api/v1/products/getSingleProd/${id}`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      console.log(data);
      navigate('/dashboard/admin/singleProduct', { state: { product: data.product } }); // Pass product data as state
    } catch (err) {
      console.error(err);
    }
  };

// Load more products (pagination)
const loadHandler = async () => {
  try {
    const { data } = await axios.get(`http://localhost:3000/api/v1/products/productsPerPage/${page}`);
    console.log(data);
    
    // Append new products to the existing list
    setFilteredProducts((prevProducts) => [...prevProducts, ...data.products]);
    // Increment page number after successful fetch
    setPage((prevPage) => prevPage + 1);
  } catch (err) {
    console.error('Error loading more products:', err);
  }
};

  return (
    <div className="homepage">
      <h1>Welcome</h1>
      <p>Explore our amazing products and services.</p>

      {auth?.token ? (
        <>
          <div style={{ display: 'flex' }}>
            {/* Sidebar for categories */}
            <div className="sidebar" style={{ width: '20%', padding: '10px', borderRight: '1px solid #ddd' }}>
              <h3>Filter by Category</h3>
              {categories.map((category) => (
                <div key={category._id}>
                  <input
                    type="checkbox"
                    id={category._id}
                    value={category._id}
                    onChange={() => handleCheckboxChange(category._id)}
                  />
                  <label htmlFor={category._id} style={{ marginLeft: '5px' }}>
                    {category.name}
                  </label>
                </div>
              ))}
              <button className='reset' onClick={handleReset}>Reset</button>
            </div>

            {/* Products list */}
            <div className="products-list" style={{ width: '80%', padding: '10px' }}>
              {filteredProducts.map((product) => (
                <div className="each-product" key={product._id} onClick={() => handleClick(product._id)}>
                  <h2>{product.name}</h2>
                  <p>
                    <strong>Price:</strong> ${product.price}
                  </p>
                  <p>
                    <strong>Description:</strong> {product.description.substring(0, 20)}...
                  </p>
                  <p>
                    <strong>Category:</strong> {product.category?.name || 'Uncategorized'}
                  </p>
                  <img
                    className="product-image"
                    src={`http://localhost:3000/api/v1/products/photo/${product._id}`}
                    alt={product.name}
                  />
                  <button className="add-to-cart-btn" style={{ width: '120px' }}>
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div>
            <button className="btn btn-primary" onClick={loadHandler}>Load more</button>
          </div>
        </>
      ) : (
        <h2>Please log in to access exclusive features.</h2>
      )}
    </div>
  );
};

export default Homepage;