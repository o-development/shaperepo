import React from 'react';
import EditorComponent from './EditorComponent';
import { ShapeRef } from '../../../types/shexTypes';
import { Tag } from 'antd';
import { useContext } from 'react';
import { GetLabelContext } from '../GuiShapeRepresentation';

const ShapeRefEditor: EditorComponent<ShapeRef> = ({ data }) => {
  const getLabel = useContext(GetLabelContext);
  const label = getLabel(data.reference);
  return <Tag>@{label || data.reference}</Tag>;
};

export default ShapeRefEditor;
