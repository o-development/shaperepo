import React from 'react';
import EditorComponent from './EditorComponent';
import { Shape } from '../../../types/shexTypes';
import TripleExprEditor from './TripleExprEditor';
import { Collapse, Tag, Tooltip, Switch, Button, Space } from 'antd';
import SemActsEditor from './SemActsEditor';
import { StopOutlined, PlusOutlined, CloseOutlined } from '@ant-design/icons';
import PredicateLink from './PredicateLink';

const ShapeEditor: EditorComponent<Shape> = ({ data, editMode }) => {
  return (
    <div>
      <div style={{ margin: '8px 0 8px 0', lineHeight: 2 }}>
        {editMode ? (
          <Switch
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
        {editMode || (data.extra && data.extra.length > 0) ? (
          <span>
            Allows Extra Properties:{' '}
            {data.extra.map((predicate) => (
              <Space key={predicate} style={{ marginRight: '8px' }}>
                <PredicateLink data={predicate} editMode={editMode} />
                {editMode ? (
                  <Button
                    shape="circle"
                    icon={<CloseOutlined />}
                    size="small"
                  />
                ) : (
                  ''
                )}
              </Space>
            ))}
            {editMode ? (
              <Button shape="round" icon={<PlusOutlined />} size="small">
                Add Extra Property
              </Button>
            ) : (
              ''
            )}
          </span>
        ) : (
          ''
        )}
      </div>
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
