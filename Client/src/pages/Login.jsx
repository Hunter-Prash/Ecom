import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/context.jsx';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const {auth, setAuth} = useAuth();  

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('http://localhost:3000/api/v1/auth/login', { email, password });

           
            if (!data?.token || !data?.user) {
                throw new Error('Invalid response from server');
            }

           
            toast.success("Login successful!");
            console.log(data)
            // Set authentication state
            //setAuth({ token: data.token, user: data.user });

            localStorage.setItem('auth', JSON.stringify({ token: data.token, user: data.user }));

            
            setTimeout(() => {
                navigate('/');
            }, 1000); 

        } catch (err) {
            console.error(err);
            toast.error('Something went wrong. Please try again.');
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2 className="login-title">Login</h2>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        className="form-control" 
                        id="exampleInputEmail1" 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        className="form-control" 
                        id="exampleInputPassword1" 
                        required 
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default Login;
