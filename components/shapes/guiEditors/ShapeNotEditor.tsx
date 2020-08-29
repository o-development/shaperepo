import React from 'react';
import EditorComponent from './EditorComponent';
import { ShapeNot } from '../../../types/shexTypes';
import ShapeExprEditor from './ShapeExprEditor';

const ShapeNotEditor: EditorComponent<ShapeNot> = ({ data, editMode }) => {
  return (
    <div>
      <h3 style={{ margin: '5px 0 5px 0' }}>NOT</h3>
      <ShapeExprEditor data={data.shapeExpr} editMode={editMode} /> 
    </div>
  );
};

export default ShapeNotEditor;
