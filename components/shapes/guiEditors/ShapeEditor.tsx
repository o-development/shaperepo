import React from 'react';
import EditorComponent from './EditorComponent';
import { Shape } from '../../../types/shexTypes';
import TripleExprEditor from './TripleExprEditor';

const ShapeEditor: EditorComponent<Shape> = ({ data }) => {
  if (data.expression) {
    return <TripleExprEditor data={data.expression} />;
  }
  return <p>Shape has no expression</p>;
};

export default ShapeEditor;
