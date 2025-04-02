import React, { use } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SingleProduct = () => {
    const location = useLocation();//The useLocation hook is used in the SingleProduct component to access the state passed during navigation from the Homepage component.
    const  product  = location.state.product // Access the passed product data
    const navigate=useNavigate()

    if (!product) {
        return <div>No product data available</div>; // Handle case where no product data is passed
    }

    return (
        <div className="single-product-container">
            <h2>Product Details</h2>
            <h3>{product.name}</h3>
            <p>Price: ${product.price}</p>
            <p>Description: {product.description}</p>
            <p>Category: {product.category?.name || 'Uncategorized'}</p>
            <img
                className="single-product-image"
                src={`http://localhost:3000/api/v1/products/photo/${product._id}`}
                alt={product.name}
            />
            <button className="back-button" onClick={() => navigate(-1)}>Back</button>{/* The navigate(-1) function is used to go back to the previous page in the browser history. */}
        </div>
    );
};

export default SingleProduct;