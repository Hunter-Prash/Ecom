import React from 'react';
import { useAuth } from '../context/context.jsx';

const Homepage = () => {
  const { auth } = useAuth();

  return (
    <div>
      <h1>Homepage</h1>
      <pre>{JSON.stringify(auth, null, 2)}</pre>
    </div>
  );
};

export default Homepage;