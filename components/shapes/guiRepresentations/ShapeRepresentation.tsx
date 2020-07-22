import React from 'react';
import RepresenationComponent from './RepresenationComponent';
import { Shape } from '../../../types/shexTypes';
import TripleExprRepresentation from './TripleExprRepresentation';

const ShapeRepresentation: RepresenationComponent<Shape> = ({ data }) => {
  if (data.expression) {
    return <TripleExprRepresentation data={data.expression} />;
  }
  return <p>Shape has no expression</p>;
};

export default ShapeRepresentation;
