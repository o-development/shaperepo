import React from 'react';

interface SearchBarProps {
  initialSearch?: string;
}

const SearchBar: React.FunctionComponent<SearchBarProps> = ({
  initialSearch = '',
}) => {
  return <div>Search: {initialSearch}</div>;
};

export default SearchBar;
