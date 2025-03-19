import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/context.jsx';
import { toast, ToastContainer ,Bounce} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const {auth,setAuth} = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('http://localhost:3000/api/v1/auth/login', { email, password });

           
            if (!data?.token || !data?.user) {
               // throw new Error('Invalid response from server');
               toast.error('Error!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
                });
            }

           
            toast.success('Login success', {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
                });
            console.log(data)
           
            // Save authentication data to local storage
            localStorage.setItem('auth', JSON.stringify({ token: data.token, user: data.user }));
            
             // Set authentication state
            setAuth({ token: data.token, user: data.user });//React Re-renders Immediately
           // When you call setAuth(), React re-renders components that depend on auth.(In this case, the Header component depends on auth as it shows login/logout links based on the authentication state.)
            //This ensures that the UI updates immediately based on the new authentication state.
            
            // Redirect based on ROLE BASED AUTHTHENTICATION
            setTimeout(() => {
                if (data.user.role === 1) {
                    navigate('/admin'); // Redirect admin to admin dashboard
                } else {
                    navigate('/dashboard'); // Redirect normal user to user dashboard
                }
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
                <div>
                     <button type="submit" className="btn btn-primary">Submit</button>
                    
                </div>
                <div>
                     <button type="button" className="btn btn-forgot-password" onClick={() => { navigate('/forgotpassword') }}>Forgot Password</button>
                    
                </div>
                

            </form>
            <ToastContainer
                    position="top-center"
                    autoClose={1000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick={false}
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover={false}
                    theme="dark"
                    transition={Bounce}
                />
        </div>
    );
};

export default Login;
