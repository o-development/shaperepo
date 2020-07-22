import React from 'react';
import fetch from 'isomorphic-unfetch';
import getErrorProps from '../../util/getErrorProps';
import BaseProps from '../../util/BaseProps';
import Error from 'next/error';
import SchemaRecord from '../../types/SchemaRecord';
import HttpError from '../../util/HttpError';
import url from 'url';
import ShapePage from '../../components/shapes/ShapesPage';
import { NextPage, NextPageContext } from 'next';
import absoluteUrl from 'next-absolute-url';

interface ShapeProps extends BaseProps {
  schemaRecord?: SchemaRecord;
}

const Shapes: NextPage<ShapeProps> = (props: ShapeProps) => {
  if (props.err) {
    return <Error statusCode={props.err.status} title={props.err.message} />;
  }
  if (!props.schemaRecord) {
    return <Error statusCode={500} title={'No schema found'} />;
  }
  return <ShapePage schema={props.schemaRecord} />;
};

Shapes.getInitialProps = async ({
  req,
  res,
  query,
}: NextPageContext): Promise<ShapeProps> => {
  try {
    const { origin } = absoluteUrl(req);
    const reqUrl = url.parse(`${origin}/api/shape`, true);
    reqUrl.query = query;
    const res = await fetch(url.format(reqUrl));
    if (res.status !== 200) {
      throw new HttpError(res.status, await res.text());
    }
    const json = await res.json();
    return { schemaRecord: json as SchemaRecord };
  } catch (err) {
    return getErrorProps(err, res);
  }
};

export default Shapes;
