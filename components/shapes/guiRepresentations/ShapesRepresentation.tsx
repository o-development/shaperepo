import React from 'react';
import RepresenationComponent from './RepresenationComponent';
import { shapes } from '../../../types/shexTypes';
import { Fragment } from 'react';
import { Divider, Space } from 'antd';
import ShapeExprRepresentation from './ShapeExprRepresentation';
import CopyToClipboardButton from '../../common/CopyToClipboardButton';

const ShapesRepresentation: RepresenationComponent<shapes> = ({ data }) => {
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
          <ShapeExprRepresentation data={data[key]} />
        </Fragment>
      ))}
    </>
  );
};

export default ShapesRepresentation;
