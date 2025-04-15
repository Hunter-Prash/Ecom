import React, { useEffect, useState } from 'react';
import { useCart } from '../context/cartContext';

const Cart = () => {
  const { cart, setCart } = useCart();
  const [quantities, setQuantities] = useState([]);

  useEffect(() => {
    setQuantities(Array(cart.length).fill(1));
  }, [cart]);

  const handleIncrement = (index) => {
    const updatedQuantities = [...quantities];
    updatedQuantities[index]++;
    setQuantities(updatedQuantities);
  };

  const handleDecrement = (index) => {
    const updatedQuantities = [...quantities];
    if (updatedQuantities[index] > 1) {
      updatedQuantities[index]--;
      setQuantities(updatedQuantities);
    }
  };

  return (
    <>
      {cart.length > 0 ? (
        <div className="container my-4">
          <h1 className="text-center mb-4">🛒 Your Cart</h1>
          <table className="table table-bordered text-center align-middle shadow">
            <thead className="table-dark">
              <tr>
                <th>Product Name</th>
                <th>Price ($)</th>
                <th style={{ width: '160px' }}>Quantity</th>
                <th>Total ($)</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>${item.price}</td>
                  <td>
                    <div className="d-flex justify-content-center align-items-center gap-2">
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDecrement(index)}
                      >
                        −
                      </button>
                      <span className="fw-bold">{quantities[index]}</span>
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() => handleIncrement(index)}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td>${(item.price * quantities[index])}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="container my-5 text-center">
          <h1>Your Cart is Empty 😔</h1>
        </div>
      )}
    </>
  );
};

export default Cart;
