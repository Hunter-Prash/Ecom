import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/context';
import { toast, ToastContainer ,Bounce} from 'react-toastify';
import SearchInput from './SearchInput';

const Header = () => {
  const { auth,setAuth } = useAuth(); //useAuth() returns an object { auth, setAuth }. We are destructuring the object to get the auth property. The auth property contains the user object if the user is authenticated, otherwise it is null.

  const handleLogout = () => {

    setAuth({ token: null, user: null });//immediately re renders components that depend on auth like navbar as it shows login/logout links based on the authentication state.
    localStorage.removeItem('auth');
    toast.success('Logged Out sucessfully');
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">ECOM</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contact</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/policy">Policy</Link>
            </li>
          </ul>
          <SearchInput/>
          <ul className="navbar-nav ms-auto">
            {
              auth?.user ? (//This syntax is called optional chaining (?.) in JavaScript.It means auth && auth.user. If auth is null or undefined, the expression will short-circuit and return null. If auth is not null or undefined, it will return auth.user.
                <li className="nav-item">
                  <Link className="nav-link" to="/" onClick={handleLogout}>Logout</Link>
                  
                </li>//on logging out redirect to homepage
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/signup">Signup</Link>
                  </li>
                </>
              )
            }
            <li className="nav-item">
              <Link className="nav-link" to="/cart">Cart</Link>
            </li>
          </ul>

        </div>
      </div>
      <ToastContainer/>
    </nav>
  );
}

export default Header;