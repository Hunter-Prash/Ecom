import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Forgot = () => {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState(''); // Change password to newPassword
    const [answer, setAnswer] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/v1/auth/forgotpassword', {
                email: email,
                newPassword: newPassword, // Change password to newPassword
                answer: answer
            });
            console.log(response.data);
            toast.success('Password Changed Successfully', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });

            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } catch (err) {
            console.error(err);
            toast.error('Something went wrong. Please try again.', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
        }
    };

    return (
        <div className="signup-container">
            <form className="signup-form" onSubmit={handleSubmit}>
                <h2 className="signup-title">Forgot Password</h2>

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
                    <label htmlFor="answer" className="form-label">
                        Security question Answer
                    </label>
                    <input
                        type="text"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        className="form-control"
                        id="answer"
                        placeholder="Your Answer"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="newpassword" className="form-label">
                        Password
                    </label>
                    <input
                        type="password"
                        value={newPassword} // Change password to newPassword
                        onChange={(e) => setNewPassword(e.target.value)} // Change password to newPassword
                        className="form-control"
                        id="newpassword"
                        placeholder="Your Password"
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
                <ToastContainer
                    position="top-center"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover={false}
                    theme="dark"
                    transition={Bounce}
                />
            </form>
        </div>
    );
};

export default Forgot;