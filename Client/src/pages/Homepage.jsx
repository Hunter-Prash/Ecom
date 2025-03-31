import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/context.jsx';
import axios from 'axios';

const Homepage = () => {
  const { auth } = useAuth();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const token = JSON.parse(localStorage.getItem('auth'))?.token;
      try {
        const { data } = await axios.get('http://localhost:3000/api/v1/products/get',{
          headers: {
            Authorization: `${token}`,
          },
        });
        console.log(data);
        setProducts(data.result);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="homepage">
      <h1>Welcome</h1>
      <p>Explore our amazing products and services.</p>

      {auth?.token ? (
        <>
          <h2>Welcome back, {auth?.user?.name || "User"}!</h2>
          <div className="products-list">
            {products.map((product) => (
              <div className="each-product" key={product._id}>
                <h2>{product.name}</h2>
                <p><strong>Price:</strong> ${product.price}</p>
                <p><strong>Description:</strong> {product.description}</p>
                <p><strong>Category:</strong> {product.category?.name || 'Uncategorized'}</p>
                <img
                  className="product-image"
                  src={`http://localhost:3000/api/v1/products/photo/${product._id}`}
                  alt={product.name}
                />
                <button className="add-to-cart-btn" style={{width: '120px'}}>Add to Cart</button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <h2>Please log in to access exclusive features.</h2>
      )}
    </div>
  );
};

export default Homepage;
