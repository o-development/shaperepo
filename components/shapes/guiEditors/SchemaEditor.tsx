import React from 'react';
import EditorComponent from './EditorComponent';
import { Schema } from '../../../types/shexTypes';
import ShapesEditor from './ShapesEditor';

const SchemaEditor: EditorComponent<Schema> = ({ data }) => {
  if (data.shapes) {
    return <ShapesEditor data={data.shapes} />;
  } else {
    return <p>This schema has no shapes.</p>;
  }
};

export default SchemaEditor;
