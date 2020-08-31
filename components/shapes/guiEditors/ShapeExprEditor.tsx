import React, { useState } from 'react';
import EditorComponent from './EditorComponent';
import { shapeExpr } from '../../../types/shexTypes';
import ShapeOrEditor from './ShapeOrEditor';
import ShapeAndEditor from './ShapeAndEditor';
import ShapeNotEditor from './ShapeNotEditor';
import NodeConstraintEditor from './NodeConstraintEditor';
import ShapeEditor from './ShapeEditor';
import ShapeRefEditor from './ShapeRefEditor';
import { Input, Select } from 'antd';

const ShapeExprEditor: EditorComponent<shapeExpr> = ({ data, editMode }) => {
  const [newShapeExpr, setNewShapeExpr] = useState(
    data || {
      type: 'NodeConstraint',
    },
  );
  const exprType =
    typeof newShapeExpr === 'string' ? 'String' : newShapeExpr.type;
  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {editMode ? (
        <div
          style={{ borderBottom: '1px solid #f0f0f0', padding: '8px 0 8px 0' }}
        >
          <Select
            value={exprType}
            style={{
              width: '150px',
            }}
          >
            <Select.Option value="Shape">Shape</Select.Option>
            <Select.Option value="NodeConstraint">Constraint</Select.Option>
            <Select.Option value="ShapeRef">Shape Reference</Select.Option>
            <Select.Option value="ShapeAnd">Shape And</Select.Option>
            <Select.Option value="ShapeOr">Shape Or</Select.Option>
            <Select.Option value="ShapeNot">Shape Not</Select.Option>
            <Select.Option value="String">String</Select.Option>
          </Select>
        </div>
      ) : (
        ''
      )}
      {(() => {
        if (typeof newShapeExpr === 'string') {
          if (!editMode) {
            return <span>{newShapeExpr}</span>;
          } else {
            return (
              <Input
                value={newShapeExpr}
                onChange={(e) => setNewShapeExpr(e.target.value)}
              />
            );
          }
        } else {
          switch (newShapeExpr.type) {
            case 'ShapeOr':
              return <ShapeOrEditor data={newShapeExpr} editMode={editMode} />;
            case 'ShapeAnd':
              return <ShapeAndEditor data={newShapeExpr} editMode={editMode} />;
            case 'ShapeNot':
              return <ShapeNotEditor data={newShapeExpr} editMode={editMode} />;
            case 'NodeConstraint':
              return (
                <NodeConstraintEditor data={newShapeExpr} editMode={editMode} />
              );
            case 'Shape':
              return <ShapeEditor data={newShapeExpr} editMode={editMode} />;
            case 'ShapeRef':
              return <ShapeRefEditor data={newShapeExpr} editMode={editMode} />;
          }
        }
      })()}
    </div>
  );
};

export default ShapeExprEditor;
