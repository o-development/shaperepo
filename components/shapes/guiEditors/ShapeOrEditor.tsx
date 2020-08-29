import React from 'react';
import EditorComponent from './EditorComponent';
import { ShapeOr } from '../../../types/shexTypes';
import ShapeBooleanEditor from './ShapeBooleanEditor';

const ShapeOrEditor: EditorComponent<ShapeOr> = ({ data, editMode }) => {
  return (
    <ShapeBooleanEditor
      data={data}
      editMode={editMode}
      logicalOperatorName="OR"
      expressionType="ShapeOr"
    />
  );
};

export default ShapeOrEditor;
