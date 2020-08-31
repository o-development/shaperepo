import React from 'react';
import SchemaRecord from '../../types/SchemaRecord';

interface ShexCShapeRepresentationProps {
  schema: SchemaRecord;
}

const ShexCShapeRepresentation: React.FunctionComponent<ShexCShapeRepresentationProps> = ({
  schema,
}) => {
  return (
    <pre style={{ padding: '25px 50px 25px 50px' }}>
      {schema.metadata.shexC}
    </pre>
  );
};

export default ShexCShapeRepresentation;
