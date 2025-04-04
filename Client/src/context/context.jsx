import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ user: null, token: "" });
  const [loading, setLoading] = useState(true); // Add loading state.This is done to prevent UI rendering before auth is set.
  
  // Retrieve auth from local storage on initial render when the component mounts
  useEffect(() => {
    const storedAuth = localStorage.getItem("auth");//auth contains user and token.It is an object
    if (storedAuth) {
      setAuth(JSON.parse(storedAuth));//converts string which is stored in local storage to JSON object.whenever setAuth changes , all components dependent upon setAuth re render like the navbar login/logout.When you call setAuth(), React re-renders components that depend on auth.(In this case, the Header component depends on auth as it shows login/logout links based on the authentication state.)
      
    }
    setLoading(false); // Set loading to false after retrieving auth.This is done to prevent UI rendering before auth is set as setAuth is async.If we don't set loading to false, the UI will render before auth is set, which will result in the UI showing the login page even if the user is already logged in or the screen will flicker when the user is redirected to the login page after logging in.
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Prevent UI rendering before auth is set
  }

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>//This is the provider which provides the value to the children components
  );
};

// Custom Hook
const useAuth = () => useContext(AuthContext);//This is the custom hook which is used to access the value provided by the provider.We can use this hook in any component to access the auth state and setAuth function.

export { useAuth, AuthProvider };
