import React from 'react';
import SchemaRecord from '../../types/SchemaRecord';
import ShapesRepresentations from './ShapesRepresentations';
import CustomLink from '../common/CustomLink';

interface ShapesPageProps {
  schema: SchemaRecord;
}

const ShapePage: React.FunctionComponent<ShapesPageProps> = ({ schema }) => {
  const { metadata } = schema;
  return (
    <div>
      <h2>{metadata.label}</h2>
      <h1>
        <CustomLink href={metadata.id} target="_blank">
          {metadata.id}
        </CustomLink>
      </h1>
      <ShapesRepresentations schema={schema} />
    </div>
  );
};

export default ShapePage;
