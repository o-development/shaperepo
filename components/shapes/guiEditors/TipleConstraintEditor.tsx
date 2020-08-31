import React from 'react';
import EditorComponent from './EditorComponent';
import {
  TripleConstraint,
  shapeExpr,
  Annotation,
} from '../../../types/shexTypes';
import ShapeExprEditor from './ShapeExprEditor';
import Table, { ColumnsType } from 'antd/lib/table';
import PredicateEditor from './PredicateEditor';

const TripleConstraintEditor: EditorComponent<
  TripleConstraint | TripleConstraint[]
> = ({ data, editMode }) => {
  const constraints: TripleConstraint[] = Array.isArray(data) ? data : [data];

  const columns: ColumnsType<TripleConstraint> = [
    {
      title: 'Property',
      dataIndex: 'predicate',
      render: function renderTablePredicate(predicate: string) {
        return <PredicateEditor data={predicate} editMode={editMode} />;
      },
    },
    {
      title: 'Type',
      dataIndex: 'valueExpr',
      render: (valExpr?: shapeExpr) => {
        if (valExpr) {
          return <ShapeExprEditor data={valExpr} />;
        }
        return 'Anything';
      },
    },
    {
      title: 'Cardinality',
      render: (_key, record: TripleConstraint) => {
        const min = record.min !== undefined ? record.min : 1;
        const max = record.max !== undefined ? record.max : 1;
        return `${min} - ${max === -1 ? '∞' : max}`;
      },
    },
    {
      title: 'Description',
      dataIndex: 'annotations',
      render: (annotations: Annotation[]) => {
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
  return (
    <Table
      dataSource={constraints}
      bordered
      columns={columns}
      rowKey="predicate"
      size="small"
      pagination={{
        pageSize: 100,
        hideOnSinglePage: true,
      }}
    />
  );
};

export default TripleConstraintEditor;
