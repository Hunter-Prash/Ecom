import { createContext, useState, useContext, useEffect } from 'react';

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
  const [search, setSearch] = useState({ 
    keyword: '',
    results:[],
   });

  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      {children}
    </SearchContext.Provider>//This is the provider which provides the value to the children components
  );
};

// Custom Hook
const useSearch = () => useContext(SearchContext);//This is the custom hook which is used to access the value provided by the provider.We can use this hook in any component to access the auth state and setAuth function.

export { useSearch, SearchProvider };
