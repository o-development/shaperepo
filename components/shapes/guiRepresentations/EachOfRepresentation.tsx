import React from 'react';
import RepresenationComponent from './RepresenationComponent';
import { EachOf } from '../../../types/shexTypes';
import RepresentationTable from '../RepresentationTable';

const EachOfRepresentation: RepresenationComponent<EachOf> = ({ data }) => {
  return <RepresentationTable expressions={data.expressions} title="Each Of" />;
};

export default EachOfRepresentation;
