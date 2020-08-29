import React, { FunctionComponent, useState } from 'react';
import EditorComponent from './EditorComponent';
import { shapes } from '../../../types/shexTypes';
import { Space, Card, Tooltip, Input, Switch, Button, Popconfirm } from 'antd';
import ShapeExprEditor from './ShapeExprEditor';
import CopyToClipboardButton from '../../common/CopyToClipboardButton';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';

interface ShapeNameProps {
  editMode: boolean;
  url: string;
  schemaUrl: string;
}

const ShapeName: FunctionComponent<ShapeNameProps> = ({
  editMode,
  url,
  schemaUrl,
}) => {
  let customUrl = true;
  let name = url;
  if (name.startsWith(`${schemaUrl}#`)) {
    customUrl = false;
    name = name.replace(`${schemaUrl}#`, '');
  }
  const [isCustomUrl, setIsCustomUrl] = useState(customUrl);
  const [newUrl, setNewUrl] = useState(url);
  if (!editMode) {
    return (
      <Space>
        <CopyToClipboardButton copyValue={url} />
        <Tooltip title={url}>
          <span>{name}</span>
        </Tooltip>
      </Space>
    );
  }
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {!isCustomUrl ? (
        <Input
          style={{ width: '100%' }}
          addonBefore={`${schemaUrl}#`}
          placeholder="ShapeName"
          value={newUrl.replace(`${schemaUrl}#`, '')}
          onChange={(e) => setNewUrl(`${schemaUrl}#${e.target.value}`)}
        />
      ) : (
        <Input
          style={{ width: '100%' }}
          placeholder="https://example.com/schama#ShapeName"
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
        />
      )}
      <Switch
        style={{ marginLeft: '10px', flexShrink: 0 }}
        checkedChildren="Custom URL"
        unCheckedChildren="Normal URL"
        checked={isCustomUrl}
        onChange={(val) => setIsCustomUrl(val)}
      />
      <Popconfirm
        title="Are you sure delete this shape?"
        onConfirm={() => console.log('yes')}
        onCancel={() => console.log('no')}
        okText="Yes"
        cancelText="No"
      >
        <Button
          shape="circle"
          icon={<CloseOutlined />}
          style={{ marginLeft: '10px' }}
        />
      </Popconfirm>
    </div>
  );
};

interface AdditionalShapesEditorProps {
  schemaUrl: string;
}

const ShapesEditor: EditorComponent<shapes, AdditionalShapesEditorProps> = ({
  data,
  editMode,
  schemaUrl,
}) => {
  return (
    <>
      {Object.keys(data).map((urlKey) => (
        <Card
          title={
            <ShapeName editMode={editMode} url={urlKey} schemaUrl={schemaUrl} />
          }
          key={urlKey}
          style={{ marginBottom: '25px' }}
        >
          <ShapeExprEditor data={data[urlKey]} editMode={editMode} />
        </Card>
      ))}
      {editMode ? (
        <Button
          type="primary"
          shape="round"
          icon={<PlusOutlined />}
          style={{ marginBottom: '25px' }}
        >
          Add Shape
        </Button>
      ) : (
        ''
      )}
    </>
  );
};

export default ShapesEditor;
