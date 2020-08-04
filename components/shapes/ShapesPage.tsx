import React from 'react';
import SchemaRecord from '../../types/SchemaRecord';
import ShapesRepresentations from './ShapesRepresentations';
import CustomLink from '../common/CustomLink';
import CopyToClipboardButton from '../common/CopyToClipboardButton';
import { Space } from 'antd';

interface ShapesPageProps {
  schema: SchemaRecord;
}

const ShapePage: React.FunctionComponent<ShapesPageProps> = ({ schema }) => {
  const { metadata } = schema;
  return (
    <div>
      <h2>{metadata.label}</h2>
      <h1>
        <Space>
          <CopyToClipboardButton copyValue={metadata.id} />
          <CustomLink href={metadata.id} target="_blank">
            {metadata.id}
          </CustomLink>
        </Space>
      </h1>
      <ShapesRepresentations schema={schema} />
    </div>
  );
};

export default ShapePage;
