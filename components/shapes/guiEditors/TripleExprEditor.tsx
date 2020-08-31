import React, { useState } from 'react';
import EditorComponent from './EditorComponent';
import {
  tripleExpr,
  shapeExpr,
  Annotation,
  tripleExprObject,
} from '../../../types/shexTypes';
import { Radio, Table, Space, Dropdown, Menu, InputNumber, Switch } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import PredicateEditor from './PredicateEditor';
import ShapeExprEditor from './ShapeExprEditor';
import { MoreOutlined, CloseCircleOutlined } from '@ant-design/icons';
import TextArea from 'antd/lib/input/TextArea';

interface AdditionalTripleExprEditorProps {
  isNested?: boolean;
}

const TripleExprEditor: EditorComponent<
  tripleExpr,
  AdditionalTripleExprEditorProps
> = ({ data, editMode, isNested }) => {
  if (typeof data === 'string') {
    return <span>data</span>;
  }
  return (
    <div>
      {editMode && !isNested ? (
        <Radio.Group
          options={[
            { label: 'Each Of', value: 'EachOf' },
            { label: 'One Of', value: 'OneOf' },
            { label: 'Triple Constraint', value: 'Triple Constraint' },
          ]}
          value={data.type}
          optionType="button"
          style={{ margin: '8px 0 8px 0' }}
        />
      ) : data.type === 'EachOf' && !isNested ? (
        <div style={{ margin: '8px 0 8px 0' }}>Each Of:</div>
      ) : data.type === 'OneOf' && !isNested ? (
        <div style={{ marginTop: '8px 0 8px 0' }}>Only One Of:</div>
      ) : (
        ''
      )}
      {(() => {
        switch (data.type) {
          case 'EachOf':
          case 'OneOf':
            return (
              <TripleExprTable
                data={
                  data.expressions.filter(
                    (expr) => typeof expr !== 'string',
                  ) as tripleExprObject[]
                }
                editMode={editMode}
                addable={true}
              />
            );
          case 'TripleConstraint':
            return (
              <TripleExprTable
                data={[data]}
                editMode={editMode}
                addable={false}
              />
            );
        }
      })()}
    </div>
  );
};

interface TripleExprTableProps {
  addable: boolean;
  editMode?: boolean;
  data: tableTripleExprObject[];
}

type tableTripleExprObject = tripleExprObject & { placeholder?: boolean };

const TripleExprTable: React.FunctionComponent<TripleExprTableProps> = ({
  addable,
  editMode,
  data,
}) => {
  const columns: ColumnsType<tripleExprObject & { placeholder?: boolean }> = [
    {
      title: 'Property',
      dataIndex: 'predicate',
      render: function renderTablePredicate(predicate: string, expr) {
        if (expr.type !== 'TripleConstraint') {
          return {
            children: (
              <div>
                <div style={{ marginBottom: '16px' }}>
                  {expr.type === 'EachOf' ? 'Each Of:' : 'Only One Of:'}
                </div>
                <TripleExprEditor
                  data={expr}
                  editMode={editMode}
                  isNested={true}
                />
              </div>
            ),
            props: {
              colSpan: 4,
            },
          };
        }
        return (
          <div style={{ opacity: expr.placeholder ? 0.4 : 1 }}>
            <PredicateEditor data={predicate} editMode={editMode} />
          </div>
        );
      },
    },
    {
      title: 'Type',
      dataIndex: 'valueExpr',
      render: function renderTableVlaueExpr(valExpr: shapeExpr, expr) {
        if (expr.type !== 'TripleConstraint') {
          return { props: { colSpan: 0 } };
        }
        return (
          <div style={{ opacity: expr.placeholder ? 0.4 : 1 }}>
            {<ShapeExprEditor data={valExpr} editMode={editMode} />}
          </div>
        );
      },
    },
    {
      title: 'Cardinality',
      render: (_key, expr) => {
        if (expr.type !== 'TripleConstraint') {
          return { props: { colSpan: 0 } };
        }
        const min = expr.min !== undefined ? expr.min : 1;
        const max = expr.max !== undefined ? expr.max : 1;
        if (editMode) {
          return (
            <Space size="small" style={{ opacity: expr.placeholder ? 0.4 : 1 }}>
              <InputNumber min={0} value={min} style={{ width: '45px' }} />-
              {max !== -1 ? (
                <InputNumber min={1} value={max} style={{ width: '45px' }} />
              ) : (
                ''
              )}
              <Switch
                checkedChildren="∞"
                unCheckedChildren="#"
                checked={max === -1}
                size="small"
              />
            </Space>
          );
        }
        return `${min} - ${max === -1 ? '∞' : max}`;
      },
    },
    {
      title: 'Description',
      dataIndex: 'annotations',
      render: (annotations: Annotation[], expr) => {
        if (expr.type !== 'TripleConstraint') {
          return { props: { colSpan: 0 } };
        }
        const commentAnnotation = annotations
          ? annotations.find(
              (annotation) =>
                annotation.predicate ===
                'http://www.w3.org/2000/01/rdf-schema#comment',
            )
          : undefined;
        const description = commentAnnotation
          ? typeof commentAnnotation.object === 'string'
            ? commentAnnotation.object
            : commentAnnotation.object.value
          : '';
        if (editMode) {
          return (
            <TextArea
              placeholder="Property Description"
              autoSize
              value={description}
              style={{ opacity: expr.placeholder ? 0.4 : 1 }}
            />
          );
        }
        return description;
      },
    },
  ];
  if (editMode && addable) {
    columns.push({
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: function renderTableCloseButton(_key, expr) {
        return (
          <Space
            style={{
              fontSize: '16px',
              opacity: expr.placeholder ? 0.4 : 1,
            }}
          >
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item key="0">Each Of</Menu.Item>
                  <Menu.Item key="1">One Of</Menu.Item>
                  <Menu.Item key="2">TripleConstraint</Menu.Item>
                </Menu>
              }
              trigger={['click']}
            >
              <a>
                <MoreOutlined />
              </a>
            </Dropdown>
            <a>
              <CloseCircleOutlined />
            </a>
          </Space>
        );
      },
    });

    // Add an extra row for editing
    data.push({
      type: 'TripleConstraint',
      predicate: '',
      placeholder: true,
    });
  }

  return (
    <Table
      dataSource={data}
      columns={columns}
      rowKey="predicate"
      size="small"
      bordered
      pagination={{
        pageSize: 100,
        hideOnSinglePage: true,
      }}
    />
  );
};

export default TripleExprEditor;
