import React, { useState } from 'react';
import SchemaRecord from '../../types/SchemaRecord';
import { Menu } from 'antd';
import GuiShapeRepresentation from './GuiShapeRepresentation';
import ShexCShapeRepresentation from './ShexCShapeRepresentation';
import ShexJShapeRepresentation from './ShexJShapeRepresentation';

interface ShapesRepresentationsProps {
  schema: SchemaRecord;
}

const ShapesRepresentations: React.FunctionComponent<ShapesRepresentationsProps> = ({
  schema,
}) => {
  const [selected, setSelected] = useState('gui');
  return (
    <div>
      <Menu
        mode="horizontal"
        selectedKeys={[selected]}
        onClick={(e) => setSelected(e.key as string)}
      >
        <Menu.Item key="gui">Table View</Menu.Item>
        <Menu.Item key="shexJ">ShexJ View</Menu.Item>
      </Menu>
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

export default ShapesRepresentations;
