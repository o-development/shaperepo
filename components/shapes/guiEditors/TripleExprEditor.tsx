import React from 'react';
import EditorComponent from './EditorComponent';
import { tripleExpr } from '../../../types/shexTypes';
import EachOfEditor from './EachOfEditor';
import OneOfEditor from './OneOfEditor';
import TripleConstraintEditor from './TipleConstraintEditor';

const TripleExprEditor: EditorComponent<tripleExpr> = ({ data }) => {
  if (typeof data === 'string') {
    return <span>data</span>;
  } else {
    switch (data.type) {
      case 'EachOf':
        return <EachOfEditor data={data} />;
      case 'OneOf':
        return <OneOfEditor data={data} />;
      case 'TripleConstraint':
        return <TripleConstraintEditor data={data} />;
    }
  }
};

export default TripleExprEditor;
