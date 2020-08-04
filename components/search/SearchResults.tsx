import React from 'react';
import SchemaMetadata from '../../types/SchemaMetadata';
import SearchResult from './SearchResult';
import { Space, Empty, Button } from 'antd';

interface SearchResultsProps {
  results: SchemaMetadata[];
}

const SearchResults: React.FunctionComponent<SearchResultsProps> = ({
  results,
}) => {
  if (results.length === 0) {
    return (
      <Empty
        description={
          <span>Are you working with a kind of data that isn&apos;t here?</span>
        }
      >
        <Button type="primary" href="/contact">
          Submit it to be added
        </Button>
      </Empty>
    );
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
