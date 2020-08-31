import React from 'react';
import EditorComponent from './EditorComponent';
import { Shape } from '../../../types/shexTypes';
import TripleExprEditor from './TripleExprEditor';
import { Collapse, Tag, Tooltip, Switch, Button } from 'antd';
import SemActsEditor from './SemActsEditor';
import { StopOutlined, PlusOutlined, CloseOutlined } from '@ant-design/icons';
import PredicateEditor from './PredicateEditor';

const ShapeEditor: EditorComponent<Shape> = ({ data, editMode }) => {
  return (
    <div>
      <div style={{ margin: '8px 0 8px 0', lineHeight: 2 }}>
        {editMode ? (
          <Switch
            checkedChildren="Open"
            unCheckedChildren="Closed"
            checked={!data.closed}
            style={{ marginRight: '8px' }}
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
            {(data.extra || []).map((predicate) => (
              <span
                key={predicate}
                style={{
                  marginRight: '8px',
                  display: 'inline-flex',
                  transform: editMode ? 'translateY(10px)' : 'translateY(0)',
                }}
              >
                <PredicateEditor data={predicate} editMode={editMode} />
                {editMode ? (
                  <Button
                    icon={<CloseOutlined />}
                    style={{ borderLeft: 'none' }}
                  />
                ) : (
                  ''
                )}
              </span>
            ))}
            {editMode ? (
              <Button shape="round" icon={<PlusOutlined />}>
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
