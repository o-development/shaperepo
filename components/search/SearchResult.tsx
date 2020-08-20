import React from 'react';
import SchemaMetadata from '../../types/SchemaMetadata';
import { Card } from 'antd';
import CustomLink from '../common/CustomLink';

interface SearchResultProps {
  metadata: SchemaMetadata;
}

const SearchResult: React.FunctionComponent<SearchResultProps> = ({
  metadata,
}) => {
  return (
    <CustomLink href={`/shapes?id=${encodeURIComponent(metadata.id)}`}>
      <Card hoverable title={metadata.label} style={{ maxWidth: '800px' }}>
        <div
          style={{
            width: '100%',
            textOverflow: 'ellipsis',
            whiteSpace: 'break-spaces',
            overflow: 'hidden',
          }}
        >
          {metadata.id}
        </div>
      </Card>
    </CustomLink>
  );
};

export default SearchResult;
