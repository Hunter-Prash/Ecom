import React from 'react';
import { useCart } from '../context/cartContext';

const Cart = () => {
  const { cart, setCart } = useCart();

  const handleIncrement = (index) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity = (updatedCart[index].quantity || 1) + 1;
    setCart(updatedCart);
  };

  const handleDecrement = (index) => {
    const updatedCart = [...cart];
    if ((updatedCart[index].quantity || 1) > 1) {
      updatedCart[index].quantity--;
      setCart(updatedCart);
    }
  };

  const handleRemove = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const quantity = item.quantity || 1;
      return total + item.price * quantity;
    }, 0);
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
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>${item.price}</td>
                  <td>
                    <div className="d-flex justify-content-center align-items-center gap-2">
                      <button className="btn btn-sm btn-danger" onClick={() => handleDecrement(index)}>−</button>
                      <span className="fw-bold">{item.quantity || 1}</span>
                      <button className="btn btn-sm btn-success" onClick={() => handleIncrement(index)}>+</button>
                    </div>
                  </td>
                  <td>${(item.price * (item.quantity || 1)).toFixed(2)}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-danger px-2 py-1"
                      style={{ whiteSpace: 'nowrap' }}
                      onClick={() => handleRemove(index)}
                    >
                      🗑️ Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-end fw-bold fs-5 me-2">
            Total: ${calculateTotal().toFixed(2)}
          </div>
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
