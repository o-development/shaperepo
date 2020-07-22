import React from 'react';
import SchemaMetadata from '../../types/SchemaMetadata';
import SearchResult from './SearchResult';

interface SearchResultsProps {
  results: SchemaMetadata[];
}

const SearchResults: React.FunctionComponent<SearchResultsProps> = ({
  results,
}) => {
  return (
    <div>
      {results.map((result) => (
        <SearchResult metadata={result} key={result.id} />
      ))}
    </div>
  );
};

export default SearchResults;
