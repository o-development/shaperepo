import React from 'react';
import SchemaMetadata from '../../types/SchemaMetadata';
import SearchResult from './SearchResult';
import { Empty, List } from 'antd';

interface GridSearchResultsProps {
  results: SchemaMetadata[];
}

const GridSearchResults: React.FunctionComponent<GridSearchResultsProps> = ({
  results,
}) => {
  if (results.length === 0) {
    return <Empty description={<span>No results found</span>} />;
  }
  return (
    <List<SchemaMetadata>
      grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 4,
        lg: 4,
        xl: 6,
        xxl: 3,
      }}
      pagination={{
        pageSize: 24,
        showSizeChanger: false,
      }}
      dataSource={results}
      renderItem={(item) => (
        <List.Item>
          <SearchResult metadata={item} />
        </List.Item>
      )}
    />
  );
};

export default GridSearchResults;
