import React from 'react';
import RepresenationComponent from './RepresenationComponent';
import { OneOf } from '../../../types/shexTypes';
import RepresentationTable from '../RepresentationTable';

const OneOfRepresentation: RepresenationComponent<OneOf> = ({ data }) => {
  return <RepresentationTable expressions={data.expressions} title="One Of" />;
};

export default OneOfRepresentation;
