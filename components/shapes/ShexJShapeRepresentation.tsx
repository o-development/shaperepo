import React from 'react';
import SchemaRecord from '../../types/SchemaRecord';

interface ShexJShapeRepresentationProps {
  schema: SchemaRecord;
}

const ShexJShapeRepresentation: React.FunctionComponent<ShexJShapeRepresentationProps> = ({
  schema,
}) => {
  const renderedSchema = {
    ...schema,
  };
  delete renderedSchema.metadata;
  delete renderedSchema._id;
  return <pre>{JSON.stringify(renderedSchema, null, 2)}</pre>;
};

export default ShexJShapeRepresentation;
