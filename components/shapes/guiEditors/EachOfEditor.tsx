import React from 'react';
import EditorComponent from './EditorComponent';
import { EachOf } from '../../../types/shexTypes';
import TripleExpressionListEditor from './TripleExpressionsListEditor';

const EachOfEditor: EditorComponent<EachOf> = ({ data, editMode }) => {
  return (
    <TripleExpressionListEditor
      data={data}
      editMode={editMode}
      title={'Each Of'}
    />
  );
};

export default EachOfEditor;
