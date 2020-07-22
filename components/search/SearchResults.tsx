import React from 'react';
import SchemaMetadata from '../../types/SchemaMetadata';
import SearchResult from './SearchResult';
import { Space, Empty } from 'antd';

interface SearchResultsProps {
  results: SchemaMetadata[];
}

const SearchResults: React.FunctionComponent<SearchResultsProps> = ({
  results,
}) => {
  if (results.length === 0) {
    return <Empty description={<span>No results found</span>} />;
  }
  return (
    <Space direction="vertical">
      {results.map((result) => (
        <SearchResult metadata={result} key={result.id} />
      ))}
    </Space>
  );
};

export default SearchResults;
