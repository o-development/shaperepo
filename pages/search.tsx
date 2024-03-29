import React, { ReactElement } from 'react';
import fetch from 'isomorphic-unfetch';
import getErrorProps from '../util/getErrorProps';
import BaseProps from '../util/BaseProps';
import Error from 'next/error';
import HttpError from '../util/HttpError';
import SchemaMetadata from '../types/SchemaMetadata';
import url from 'url';
import SearchBar from '../components/search/SearchBar';
import SearchResults from '../components/search/SearchResults';
import { NextPage, NextPageContext } from 'next';
import absoluteUrl from 'next-absolute-url';
import { Space } from 'antd';
import Head from 'next/head';
import mixpanel from 'mixpanel-browser';

interface SearchProps extends BaseProps {
  results?: SchemaMetadata[];
  query?: string;
}

const Search: NextPage<SearchProps> = (props: SearchProps): ReactElement => {
  if (props.err) {
    return <Error statusCode={props.err.status} title={props.err.message} />;
  }
  mixpanel.track('Search', { query: props.query });
  const results = props.results ? props.results : [];
  return (
    <Space direction="vertical" style={{ padding: '50px' }}>
      <Head>
        <title>{props.query} - Search on ShapeRepo</title>
      </Head>
      <SearchBar initialSearch={props.query} />
      <SearchResults results={results} />
    </Space>
  );
};

Search.getInitialProps = async ({
  req,
  res,
  query,
}: NextPageContext): Promise<SearchProps> => {
  try {
    const { origin } = absoluteUrl(req);
    const reqUrl = url.parse(`${origin}/api/search`, true);
    reqUrl.query = query;
    const res = await fetch(url.format(reqUrl));
    if (res.status !== 200) {
      throw new HttpError(res.status, await res.text());
    }
    const json = await res.json();
    return {
      results: json as SchemaMetadata[],
      query: Array.isArray(query.q) ? query.q[0] : query.q,
    };
  } catch (err) {
    return getErrorProps(err, res);
  }
};

export default Search;
