import React from 'react';
import EditorComponent from './EditorComponent';
import { EachOf } from '../../../types/shexTypes';
import EditorTable from '../EditorTable';

const EachOfEditor: EditorComponent<EachOf> = ({ data }) => {
  return <EditorTable expressions={data.expressions} title="Each Of" />;
};

export default EachOfEditor;
