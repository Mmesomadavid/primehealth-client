import { createContext, useState, useContext } from 'react';

const SearchContext = createContext<any>(null);

export function useSearch() {
  return useContext(SearchContext);
}

export function SearchProvider({ children }:any) {
  const [searchQuery, setSearchQuery] = useState('');

  console.log(searchQuery)

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </SearchContext.Provider>
  );
}