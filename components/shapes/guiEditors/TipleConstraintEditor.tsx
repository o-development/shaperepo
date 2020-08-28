import React from 'react';
import EditorComponent from './EditorComponent';
import { TripleConstraint } from '../../../types/shexTypes';
import EditorTable from '../EditorTable';

const TripleConstraintEditor: EditorComponent<TripleConstraint> = ({
  data,
}) => {
  return <EditorTable expressions={[data]} />;
};

export default TripleConstraintEditor;
