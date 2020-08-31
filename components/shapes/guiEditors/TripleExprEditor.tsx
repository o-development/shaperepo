import React from 'react';
import EditorComponent from './EditorComponent';
import { tripleExpr } from '../../../types/shexTypes';
import EachOfEditor from './EachOfEditor';
import OneOfEditor from './OneOfEditor';
import TripleConstraintEditor from './TipleConstraintEditor';
import { Radio } from 'antd';

const TripleExprEditor: EditorComponent<tripleExpr> = ({ data, editMode }) => {
  if (typeof data === 'string') {
    return <span>data</span>;
  }
  return (
    <div>
      {editMode ? (
        <Radio.Group
          options={[
            { label: 'Each Of', value: 'EachOf' },
            { label: 'One Of', value: 'OneOf' },
            { label: 'Triple Constraint', value: 'Triple Constraint' },
          ]}
          value={data.type}
          optionType="button"
          style={{ marginTop: '8px' }}
        />
      ) : (
        ''
      )}
      {(() => {
        switch (data.type) {
          case 'EachOf':
            return <EachOfEditor data={data} editMode={editMode} />;
          case 'OneOf':
            return <OneOfEditor data={data} editMode={editMode} />;
          case 'TripleConstraint':
            return <TripleConstraintEditor data={data} editMode={editMode} />;
        }
      })()}
    </div>
  );
};

export default TripleExprEditor;
