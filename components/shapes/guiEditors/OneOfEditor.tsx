import React from 'react';
import EditorComponent from './EditorComponent';
import { OneOf } from '../../../types/shexTypes';
import TripleExpressionListEditor from './TripleExpressionsListEditor';

const EachOfEditor: EditorComponent<OneOf> = ({ data, editMode }) => {
  return (
    <TripleExpressionListEditor
      data={data}
      editMode={editMode}
      title={'Only One Of'}
    />
  );
};

export default EachOfEditor;
