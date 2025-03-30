import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Products = () => {
    const [products, setProducts] = useState([]);

    const handleDelete = async (id) => {
        const token = JSON.parse(localStorage.getItem('auth'))?.token;
        try {
            const response = await axios.delete(`http://localhost:3000/api/v1/products/delete/${id}`, {
                headers: {
                    Authorization: `${token}`,
                }
            });
    
            console.log(response.data);
            window.location.reload(); // Reload the page to see the updated product list
        } catch (error) {
            console.error(error);
        }
    };
    
    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('auth'))?.token;
        const fetchProducts = async () => {
            try {
                const { data } = await axios.get('http://localhost:3000/api/v1/products/get', {
                    headers: {
                        Authorization: `${token}`,
                    },
                });
                console.log(data); // Debugging: check response
                setProducts(data.result);
            } catch (error) {
                console.error(error);
            }
        };
        fetchProducts();
    }, []);


    return (
        <>
            <h2>All Products</h2>
            <ul className="product-list">
                {products.map((product) => (
                    <li key={product._id} className="product-item">
                        <div className="product-details">
                            <h3>{product.name}</h3>
                            <p>Price: ${product.price}</p>
                            <p>Category: {product.category?.name || 'Uncategorized'}</p>
                        </div>
                        <div className="product-actions">
                            <button className="update-btn" onClick={() => handleUpdate(product._id)}>Update</button>
                            <button className="delete-btn" onClick={() => handleDelete(product._id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default Products;
