import React from 'react';
import RepresenationComponent from './RepresenationComponent';
import { tripleExpr } from '../../../types/shexTypes';
import EachOfRepresentation from './EachOfRepresentation';
import OneOfRepresentation from './OneOfRepresentation';
import TripleConstraintRepresentation from './TipleConstraintRepresentation';

const TripleExprRepresentation: RepresenationComponent<tripleExpr> = ({
  data,
}) => {
  if (typeof data === 'string') {
    return <span>data</span>;
  } else {
    switch (data.type) {
      case 'EachOf':
        return <EachOfRepresentation data={data} />;
      case 'OneOf':
        return <OneOfRepresentation data={data} />;
      case 'TripleConstraint':
        return <TripleConstraintRepresentation data={data} />;
    }
  }
};

export default TripleExprRepresentation;
