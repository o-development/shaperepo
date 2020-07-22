import React from 'react';
import RepresenationComponent from './RepresenationComponent';
import { TripleConstraint } from '../../../types/shexTypes';
import RepresentationTable from '../RepresentationTable';

const TripleConstraintRepresentation: RepresenationComponent<TripleConstraint> = ({
  data,
}) => {
  return <RepresentationTable expressions={[data]} />;
};

export default TripleConstraintRepresentation;
