import React from 'react';
import EditorComponent from './EditorComponent';
import { OneOf } from '../../../types/shexTypes';
import EditorTable from '../EditorTable';

const OneOfEditor: EditorComponent<OneOf> = ({ data }) => {
  return <EditorTable expressions={data.expressions} title="One Of" />;
};

export default OneOfEditor;
