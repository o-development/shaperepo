import React, { useContext } from 'react';
import { tripleExpr, tripleExprObject } from '../../types/shexTypes';
import { Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import ShapeExprRepresentation from './guiRepresentations/ShapeExprRepresentation';
import { shapeExpr } from '../../types/shexTypes';
import { GetLabelContext } from './GuiShapeRepresentation';
import CustomLink from '../common/CustomLink';

interface RepresentationTableProps {
  expressions: tripleExpr[];
  title?: string;
}

const RepresentationTable: React.FunctionComponent<RepresentationTableProps> = ({
  expressions,
  title,
}) => {
  const getLabel = useContext(GetLabelContext);
  const expressionObjects = expressions.filter(
    (expr) => typeof expr !== 'string',
  ) as tripleExprObject[];
  const columns: ColumnsType<tripleExprObject> = [
    {
      title: 'Predicate',
      dataIndex: 'predicate',
      render: function renderTablePredicate(predicate: string) {
        const label = getLabel(predicate);
        return label ? (
          <CustomLink href={`/terms?id=${encodeURIComponent(predicate)}`}>
            {label}
          </CustomLink>
        ) : (
          <CustomLink href={predicate} target="_blank">
            {predicate}
          </CustomLink>
        );
      },
    },
    {
      title: 'Required?',
      dataIndex: 'min',
      render: (min) => (min !== 0 ? 'Yes' : 'No'),
    },
    {
      title: 'Cardinality',
      render: (_key, record) => {
        const min = record.min !== undefined ? record.min : 1;
        const max = record.max !== undefined ? record.max : 1;
        return `${min} - ${max === -1 ? '∞' : max}`;
      },
    },
    {
      title: 'Value',
      dataIndex: 'valueExpr',
      render: (valExpr?: shapeExpr) => {
        if (valExpr) {
          return <ShapeExprRepresentation data={valExpr} />;
        }
        return 'Anything';
      },
    },
  ];
  return (
    <Table
      dataSource={expressionObjects}
      columns={columns}
      rowKey="predicate"
      size="small"
      pagination={{
        pageSize: 100,
        hideOnSinglePage: true,
      }}
      title={() => title}
    />
  );
};

export default RepresentationTable;
