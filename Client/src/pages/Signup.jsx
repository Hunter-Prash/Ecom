import React, { useState } from "react";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents page reload on submit
    try {
      const response = await axios.post('http://localhost:3000/api/v1/auth/register', {
        name: name,
        email: email,
        password: password,
        phone: phone,
        address: address,
        answer: answer
      });
      console.log(response.data);
      // Show success toast message
      toast.success("Signup successful!");


      // Redirect to login page after a short delay
      setTimeout(() => {
        navigate('/login');
      }, 3000); // 3 seconds delay


    } catch (error) {
      console.log(error);
      toast.warn('Something went wrong');
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2 className="signup-title">Sign Up</h2>

        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control"
            id="name"
            placeholder="Your Name"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            id="email"
            placeholder="Your Email"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            id="password"
            placeholder="Your Password"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone
          </label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="form-control"
            id="phone"
            placeholder="Your Phone Number"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Address
          </label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="form-control"
            id="address"
            placeholder="Your Address"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="answer" className="form-label">
            Security question
          </label>
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="form-control"
            id="answer"
            placeholder="What is your best friend's name?"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
        <ToastContainer/>
      </form>
    </div>
  );
};

export default Signup;