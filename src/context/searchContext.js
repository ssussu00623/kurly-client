import React, { createContext, useState } from 'react';

export const SearchContext = createContext();

export const SearchProvider = ({children}) => {
  const [ searchKeyword, setSearchKeyword ] = useState('');
  const [ search, setSearch ] = useState('');
  const [ recentlyItems, setRecentlyItems  ] =useState([]);

  return (
    <SearchContext.Provider value={{ searchKeyword, setSearchKeyword, search, setSearch, recentlyItems, setRecentlyItems  }}>
      {children}
    </SearchContext.Provider>
  );
}

