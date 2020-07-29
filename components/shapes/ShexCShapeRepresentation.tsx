import React from 'react';
import SchemaRecord from '../../types/SchemaRecord';

interface ShexCShapeRepresentationProps {
  schema: SchemaRecord;
}

const ShexCShapeRepresentation: React.FunctionComponent<ShexCShapeRepresentationProps> = ({
  schema,
}) => {
  return <pre>{schema.metadata.shexC}</pre>;
};

export default ShexCShapeRepresentation;
