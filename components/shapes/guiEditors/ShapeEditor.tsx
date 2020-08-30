import React from 'react';
import EditorComponent from './EditorComponent';
import { Shape } from '../../../types/shexTypes';
import TripleExprEditor from './TripleExprEditor';
import { Collapse, Tag, Tooltip, Switch } from 'antd';
import SemActsEditor from './SemActsEditor';
import { StopOutlined } from '@ant-design/icons';

const ShapeEditor: EditorComponent<Shape> = ({ data, editMode }) => {
  return (
    <div>
      {editMode ? (
        <Switch
          style={{
            position: 'absolute',
            top: '11px',
            left: '160px',
          }}
          checkedChildren="Open"
          unCheckedChildren="Closed"
          checked={!data.closed}
        />
      ) : data.closed ? (
        <Tooltip title="Closed shapes don't allow any additional fields beyond the ones defined here.">
          <Tag icon={<StopOutlined />} color="red">
            CLOSED
          </Tag>
        </Tooltip>
      ) : (
        ''
      )}
      <TripleExprEditor data={data.expression} editMode={editMode} />
      {editMode || (data.semActs && data.semActs.length !== 0) ? (
        <Collapse ghost>
          <Collapse.Panel header="Advanced Semantic Actions" key="1">
            <SemActsEditor data={data.semActs} editMode={editMode} />
          </Collapse.Panel>
        </Collapse>
      ) : (
        ''
      )}
    </div>
  );
};

export default ShapeEditor;
