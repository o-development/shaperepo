import React from 'react';
import EditorComponent from './EditorComponent';
import { ShapeOr, ShapeAnd } from '../../../types/shexTypes';
import ShapeExprEditor from './ShapeExprEditor';
import { Button, Popconfirm } from 'antd';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';

interface AdditionalShapeBooleanEditorProps {
  logicalOperatorName: string;
  expressionType: string;
}

const ShapeBooleanEditor: EditorComponent<
  ShapeOr | ShapeAnd,
  AdditionalShapeBooleanEditorProps
> = ({ data, editMode, logicalOperatorName }) => {
  return (
    <div>
      {data.shapeExprs.reduce((agg, shapeExpr, index) => {
        agg.push(
          <div
            style={{
              position: 'relative',
              display: 'flex',
              width: '100%',
            }}
          >
            <div
              style={{
                backgroundColor: '#f0f0f0',
                width: '5px',
                marginRight: '8px',
              }}
            />
            <ShapeExprEditor data={shapeExpr} editMode={editMode} />
            {editMode ? (
              <Popconfirm
                title="Are you sure delete this shape expression?"
                onConfirm={() => console.log('yes')}
                onCancel={() => console.log('no')}
                okText="Yes"
                cancelText="No"
              >
                <Button
                  shape="circle"
                  icon={<CloseOutlined />}
                  style={{
                    position: 'absolute',
                    top: '8px',
                    right: 0,
                  }}
                />
              </Popconfirm>
            ) : (
              ''
            )}
          </div>,
        );
        if (index < data.shapeExprs.length - 1) {
          agg.push(
            <h3 style={{ margin: '8px 0 8px 0' }}>{logicalOperatorName}</h3>,
          );
        }
        return agg;
      }, [])}
      {editMode ? (
        <Button
          shape="round"
          icon={<PlusOutlined />}
          style={{ marginTop: '25px' }}
        >
          Add Shape Expression
        </Button>
      ) : (
        ''
      )}
    </div>
  );
};

export default ShapeBooleanEditor;
