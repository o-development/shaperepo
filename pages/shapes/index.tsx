import React from 'react';
import fetch from 'isomorphic-unfetch';
import getErrorProps from '../../util/getErrorProps';
import BaseProps from '../../util/BaseProps';
import Error from 'next/error';
import SchemaRecord from '../../types/SchemaRecord';
import HttpError from '../../util/HttpError';
import url from 'url';
import ShapePage from '../../components/shapes/ShapesPage';
import { NextPage, GetServerSideProps } from 'next';
import absoluteUrl from 'next-absolute-url';
import { IncomingMessage, ServerResponse } from 'http';
import { ParsedUrlQuery } from 'querystring';
import getDbApi from '../../middleware/dbMiddleware';
import returnError from '../../util/returnError';
import Cors from '../../middleware/Cors';

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

async function handleShexJ(
  req: IncomingMessage,
  res: ServerResponse,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  query: ParsedUrlQuery,
): Promise<Record<string, unknown>> {
  try {
    const dbApi = await getDbApi();
    if (!query.id || typeof query.id !== 'string') {
      throw new HttpError(400, 'A single id must be provided');
    }
    const shexJ = await dbApi.getRawSchema(query.id);
    delete shexJ.metadata;
    delete shexJ._id;
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify(shexJ));
    res.end();
  } catch (err) {
    await returnError(err, res);
  }
  return {};
}

async function handleShexC(
  req: IncomingMessage,
  res: ServerResponse,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  query: ParsedUrlQuery,
): Promise<Record<string, unknown>> {
  try {
    const dbApi = await getDbApi();
    if (!query.id || typeof query.id !== 'string') {
      throw new HttpError(400, 'A single id must be provided');
    }
    const shexC = (await dbApi.getRawSchema(query.id)).metadata.shexC;
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/shex');
    res.write(shexC);
    res.end();
  } catch (err) {
    await returnError(err, res);
  }
  return {};
}

async function handleHtml(
  req: IncomingMessage,
  res: ServerResponse,
  query: ParsedUrlQuery,
): Promise<ShapeProps> {
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
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  query,
}) => {
  await Cors(req, res);
  if (req.headers.accept.includes('application/json')) {
    return {
      props: await handleShexJ(req, res, query),
    };
  } else if (req.headers.accept.includes('text/shex')) {
    return {
      props: await handleShexC(req, res, query),
    };
  }
  return {
    props: await handleHtml(req, res, query),
  };
};

export default Shapes;
