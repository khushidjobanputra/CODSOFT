// SearchContext.js

import React, { createContext, useContext, useState } from 'react';

// Create a context
const SearchContext = createContext();

// Create a context provider
export const SearchProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const updateSearchResults = (results) => {
    setSearchResults(results);
  };

  return (
    <SearchContext.Provider
      value={{
        searchResults,
        searchTerm,
        updateSearchResults,
        setSearchTerm,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

// Custom hook to access the context
export const useSearch = () => {
  return useContext(SearchContext);
};
