import React from 'react';
import EditorComponent from './EditorComponent';
import { shapeExpr } from '../../../types/shexTypes';
import ShapeOrEditor from './ShapeOrEditor';
import ShapeAndEditor from './ShapeAndEditor';
import ShapeNotEditor from './ShapeNotEditor';
import NodeConstraintEditor from './NodeConstraintEditor';
import ShapeEditor from './ShapeEditor';
import ShapeRefEditor from './ShapeRefEditor';

const ShapeExprEditor: EditorComponent<shapeExpr> = ({ data }) => {
  if (typeof data === 'string') {
    return <span>{data}</span>;
  } else {
    switch (data.type) {
      case 'ShapeOr':
        return <ShapeOrEditor data={data} />;
      case 'ShapeAnd':
        return <ShapeAndEditor data={data} />;
      case 'ShapeNot':
        return <ShapeNotEditor data={data} />;
      case 'NodeConstraint':
        return <NodeConstraintEditor data={data} />;
      case 'Shape':
        return <ShapeEditor data={data} />;
      case 'ShapeRef':
        return <ShapeRefEditor data={data} />;
    }
  }
};

export default ShapeExprEditor;
