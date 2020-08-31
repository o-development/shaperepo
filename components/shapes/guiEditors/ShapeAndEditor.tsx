import React from 'react';
import EditorComponent from './EditorComponent';
import { ShapeAnd } from '../../../types/shexTypes';
import ShapeBooleanEditor from './ShapeBooleanEditor';

const ShapeAndEditor: EditorComponent<ShapeAnd> = ({ data, editMode }) => {
  return (
    <ShapeBooleanEditor
      data={data}
      editMode={editMode}
      logicalOperatorName="AND"
      expressionType="ShapeAnd"
    />
  );
};

export default ShapeAndEditor;
