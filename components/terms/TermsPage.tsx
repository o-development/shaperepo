import React from 'react';
import TermRecord from '../../types/TermRecord';
import CustomLink from '../common/CustomLink';
import Reference from '../../types/Reference';
import { Table, Space } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import CopyToClipboardButton from '../common/CopyToClipboardButton';

interface TermsPageProps {
  term: TermRecord;
}

interface ReferenceObject {
  _id: string;
  label: string;
}

interface TermsTableData {
  tableName: string;
  references: ReferenceObject[];
}

function normalizeReference(references: Reference[]): ReferenceObject[] {
  return references.map((reference) => {
    if (typeof reference === 'string') {
      return {
        _id: reference,
        label: '',
      };
    }
    return reference;
  });
}

const TermsPage: React.FunctionComponent<TermsPageProps> = ({ term }) => {
  const data: TermsTableData[] = [
    {
      tableName: 'Used as a Predicate in:',
      references: normalizeReference(term.incomingPredicateReferences),
    },
    {
      tableName: 'Used as an Object in:',
      references: normalizeReference(term.incomingObjectReferences),
    },
  ];

  const columns: ColumnsType<ReferenceObject> = [
    {
      title: 'Schema Name',
      dataIndex: 'label',
      render: function renderTermTableLabel(label: string, record) {
        return (
          <CustomLink href={`/shapes?id=${encodeURIComponent(record._id)}`}>
            {label}
          </CustomLink>
        );
      },
    },
    {
      title: 'Schema Link',
      dataIndex: '_id',
      render: function renderTermTableShemaLink(_id: string) {
        return (
          <Space>
            <CopyToClipboardButton copyValue={_id} />
            <CustomLink href={_id}>{_id}</CustomLink>
          </Space>
        );
      },
    },
  ];

  return (
    <div>
      <h2>{term.label}</h2>
      <h1>
        <Space>
          <CopyToClipboardButton copyValue={term._id} />
          <CustomLink href={term._id} target="_blank">
            {term._id}
          </CustomLink>
        </Space>
      </h1>
      <Space direction="vertical">
        {data.map((tableInfo) => {
          return (
            <Table<ReferenceObject>
              dataSource={tableInfo.references}
              columns={columns}
              rowKey="_id"
              size="small"
              pagination={{
                pageSize: 100,
                hideOnSinglePage: true,
              }}
              title={() => tableInfo.tableName}
              key={tableInfo.tableName}
            />
          );
        })}
      </Space>
    </div>
  );
};

export default TermsPage;
