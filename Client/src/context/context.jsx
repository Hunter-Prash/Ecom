import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ user: null, token: "" });
  const [loading, setLoading] = useState(true); // Add loading state
  
  // Retrieve auth from local storage on initial render when the component mounts
  useEffect(() => {
    const storedAuth = localStorage.getItem("auth");//auth contains user and token.It is an object
    if (storedAuth) {
      setAuth(JSON.parse(storedAuth));//converts string which is stored in local storage to JSON object
    }
    setLoading(false); // Set loading to false after retrieving auth
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Prevent UI rendering before auth is set
  }

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
