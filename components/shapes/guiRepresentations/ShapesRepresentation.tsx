import React from 'react';
import RepresenationComponent from './RepresenationComponent';
import { shapes } from '../../../types/shexTypes';
import { Fragment } from 'react';
import { Divider } from 'antd';
import ShapeExprRepresentation from './ShapeExprRepresentation';

const ShapesRepresentation: RepresenationComponent<shapes> = ({ data }) => {
  return (
    <>
      {Object.keys(data).map((key) => (
        <Fragment key={key}>
          <Divider orientation="left">{key}</Divider>
          <ShapeExprRepresentation data={data[key]} />
        </Fragment>
      ))}
    </>
  );
};

export default ShapesRepresentation;
