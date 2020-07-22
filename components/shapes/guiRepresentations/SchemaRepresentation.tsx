import React from 'react';
import RepresenationComponent from './RepresenationComponent';
import { Schema } from '../../../types/shexTypes';
import ShapesRepresentation from './ShapesRepresentation';

const SchemaRepresentation: RepresenationComponent<Schema> = ({ data }) => {
  if (data.shapes) {
    return <ShapesRepresentation data={data.shapes} />;
  } else {
    return <p>This schema has no shapes.</p>;
  }
};

export default SchemaRepresentation;
