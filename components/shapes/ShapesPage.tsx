import React, { useState } from 'react';
import SchemaRecord from '../../types/SchemaRecord';
import CustomLink from '../common/CustomLink';
import CopyToClipboardButton from '../common/CopyToClipboardButton';
import { Space, Menu } from 'antd';
import GuiShapeRepresentation from './GuiShapeRepresentation';
import ShexCShapeRepresentation from './ShexCShapeRepresentation';
import ShexJShapeRepresentation from './ShexJShapeRepresentation';

interface ShapesPageProps {
  schema: SchemaRecord;
}

const ShapePage: React.FunctionComponent<ShapesPageProps> = ({ schema }) => {
  const { metadata } = schema;
  const [selected, setSelected] = useState('gui');
  return (
    <div>
      <div style={{ backgroundColor: '#f0f2f5', padding: '25px 50px 0 50px' }}>
        <div>
          <h2>{metadata.label}</h2>
          <label>
            <Space>
              <CopyToClipboardButton copyValue={metadata.id} />
              <CustomLink href={metadata.id} target="_blank">
                {metadata.id}
              </CustomLink>
            </Space>
          </label>
        </div>
        <Menu
          mode="horizontal"
          selectedKeys={[selected]}
          style={{ backgroundColor: 'transparent' }}
          onClick={(e) => setSelected(e.key as string)}
        >
          <Menu.Item key="gui">Table View</Menu.Item>
          <Menu.Item key="shexC">ShexC View</Menu.Item>
          <Menu.Item key="shexJ">ShexJ View</Menu.Item>
        </Menu>
      </div>
      {(() => {
        switch (selected) {
          case 'gui':
            return <GuiShapeRepresentation schema={schema} />;
          case 'shexC':
            return <ShexCShapeRepresentation schema={schema} />;
          case 'shexJ':
            return <ShexJShapeRepresentation schema={schema} />;
        }
      })()}
    </div>
  );
};

export default ShapePage;
