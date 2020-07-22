import React from 'react';
import { Input } from 'antd';
import { useRouter } from 'next/router';

const { Search } = Input;

interface SearchBarProps {
  initialSearch?: string;
}

const SearchBar: React.FunctionComponent<SearchBarProps> = ({
  initialSearch = '',
}) => {
  const router = useRouter();
  return (
    <Search
      onSearch={(value) =>
        router.push(`/search?q=${encodeURIComponent(value)}`)
      }
      placeholder="Find shapes"
      defaultValue={initialSearch}
      style={{ maxWidth: 800 }}
    />
  );
};

export default SearchBar;
