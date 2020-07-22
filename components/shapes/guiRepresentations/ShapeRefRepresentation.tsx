import React from 'react';
import RepresenationComponent from './RepresenationComponent';
import { ShapeRef } from '../../../types/shexTypes';
import { Tag } from 'antd';
import { useContext } from 'react';
import { GetLabelContext } from '../GuiShapeRepresentation';

const ShapeRefRepresentation: RepresenationComponent<ShapeRef> = ({ data }) => {
  const getLabel = useContext(GetLabelContext);
  const label = getLabel(data.reference);
  return <Tag>@{label || data.reference}</Tag>;
};

export default ShapeRefRepresentation;
