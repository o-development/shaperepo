import React from 'react';
import EditorComponent from './EditorComponent';
import {
  tripleExpr,
  TripleConstraint,
  shapeExpr,
  Annotation,
  tripleExprObject,
} from '../../../types/shexTypes';
import { Radio, Table, Button } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import PredicateEditor from './PredicateEditor';
import ShapeExprEditor from './ShapeExprEditor';
import { CloseOutlined } from '@ant-design/icons';

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
          style={{ marginTop: '8px' }}
        />
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
                title={
                  isNested
                    ? undefined
                    : data.type === 'EachOf'
                    ? 'Each Of'
                    : 'Only One Of'
                }
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
  title?: string;
  addable: boolean;
  editMode?: boolean;
  data: tripleExprObject[];
}

const TripleExprTable: React.FunctionComponent<TripleExprTableProps> = ({
  title,
  addable,
  editMode,
  data,
}) => {
  const columns: ColumnsType<tripleExprObject> = [
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
        return <PredicateEditor data={predicate} editMode={editMode} />;
      },
    },
    {
      title: 'Type',
      dataIndex: 'valueExpr',
      render: (valExpr: shapeExpr, expr) => {
        if (expr.type !== 'TripleConstraint') {
          return { props: { colSpan: 0 } };
        }
        if (valExpr) {
          return <ShapeExprEditor data={valExpr} />;
        }
        return 'Anything';
      },
    },
    {
      title: 'Cardinality',
      render: (_key, expr: TripleConstraint) => {
        if (expr.type !== 'TripleConstraint') {
          return { props: { colSpan: 0 } };
        }
        const min = expr.min !== undefined ? expr.min : 1;
        const max = expr.max !== undefined ? expr.max : 1;
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
        return description;
      },
    },
  ];
  if (editMode) {
    columns.push({
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: function renderTableCloseButton() {
        return <Button icon={<CloseOutlined />} />;
      },
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
      // expandable={{
      //   expandedRowRender: function expandedRowRenderer(expr) {
      //     return (
      //       <TripleExprEditor data={expr} editMode={editMode} isNested={true} />
      //     );
      //   },
      //   rowExpandable: (expr) => expr.type !== 'TripleConstraint',
      // }}
    />
  );
};

export default TripleExprEditor;
