import React from 'react';
import EditorComponent from './EditorComponent';
import { shapes } from '../../../types/shexTypes';
import { Fragment } from 'react';
import { Divider, Space } from 'antd';
import ShapeExprEditor from './ShapeExprEditor';
import CopyToClipboardButton from '../../common/CopyToClipboardButton';

const ShapesEditor: EditorComponent<shapes> = ({ data }) => {
  return (
    <>
      {Object.keys(data).map((key) => (
        <Fragment key={key}>
          <Divider orientation="left">
            <Space>
              <CopyToClipboardButton copyValue={key} />
              {key}
            </Space>
          </Divider>
          <ShapeExprEditor data={data[key]} />
        </Fragment>
      ))}
    </>
  );
};

export default ShapesEditor;
