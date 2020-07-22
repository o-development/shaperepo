import React from 'react';
import RepresenationComponent from './RepresenationComponent';
import { shapeExpr } from '../../../types/shexTypes';
import ShapeOrRepresentation from './ShapeOrRepresentation';
import ShapeAndRepresentation from './ShapeAndRepresentation';
import ShapeNotRepresentation from './ShapeNotRepresentation';
import NodeConstraintRepresentation from './NodeConstraintRepresentation';
import ShapeRepresentation from './ShapeRepresentation';
import ShapeRefRepresentation from './ShapeRefRepresentation';

const ShapeExprRepresentation: RepresenationComponent<shapeExpr> = ({
  data,
}) => {
  if (typeof data === 'string') {
    return <span>{data}</span>;
  } else {
    switch (data.type) {
      case 'ShapeOr':
        return <ShapeOrRepresentation data={data} />;
      case 'ShapeAnd':
        return <ShapeAndRepresentation data={data} />;
      case 'ShapeNot':
        return <ShapeNotRepresentation data={data} />;
      case 'NodeConstraint':
        return <NodeConstraintRepresentation data={data} />;
      case 'Shape':
        return <ShapeRepresentation data={data} />;
      case 'ShapeRef':
        return <ShapeRefRepresentation data={data} />;
    }
  }
};

export default ShapeExprRepresentation;
