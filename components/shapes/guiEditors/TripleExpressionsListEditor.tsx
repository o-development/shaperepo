import React from 'react';
import EditorComponent from './EditorComponent';
import { EachOf, TripleConstraint, OneOf } from '../../../types/shexTypes';
import TripleConstraintEditor from './TipleConstraintEditor';
import TripleExprEditor from './TripleExprEditor';

interface AdditionalTripleExpressionListEditorProps {
  title: string;
}

const TripleExpressionListEditor: EditorComponent<
  EachOf | OneOf,
  AdditionalTripleExpressionListEditorProps
> = ({ data, editMode, title }) => {
  const tripleConstraints: TripleConstraint[] = [];
  const otherExpressions: (EachOf | OneOf)[] = [];
  data.expressions.forEach((expr) => {
    if (typeof expr !== 'string') {
      switch (expr.type) {
        case 'TripleConstraint':
          tripleConstraints.push(expr);
          break;
        case 'EachOf':
        case 'OneOf':
          otherExpressions.push(expr);
          break;
      }
    }
  });

  return (
    <div>
      {title}:
      <TripleConstraintEditor data={tripleConstraints} editMode={editMode} />
      {otherExpressions.map((expr, index) => (
        <div
          key={index}
          style={{
            padding: '8px',
            borderLeft: '1px solid #f0f0f0',
            borderBottom: '1px solid #f0f0f0',
            borderRight: '1px solid #f0f0f0',
          }}
        >
          <TripleExprEditor data={expr} editMode={editMode} isNested={true} />
        </div>
      ))}
    </div>
  );
};

export default TripleExpressionListEditor;
