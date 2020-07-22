import React from 'react';
import SchemaMetadata from '../../types/SchemaMetadata';

interface SearchResultProps {
  metadata: SchemaMetadata;
}

const SearchResult: React.FunctionComponent<SearchResultProps> = ({
  metadata,
}) => {
  return (
    <div>
      Title: {metadata.label} Url: {metadata.id}
    </div>
  );
};

export default SearchResult;
