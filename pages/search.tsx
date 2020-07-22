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

interface SearchProps extends BaseProps {
  results?: SchemaMetadata[];
  query?: string;
}

const Search: NextPage<SearchProps> = (props: SearchProps): ReactElement => {
  if (props.err) {
    return <Error statusCode={props.err.status} title={props.err.message} />;
  }
  const results = props.results ? props.results : [];
  return (
    <div>
      <SearchBar initialSearch={props.query} />
      <SearchResults results={results} />
    </div>
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
    console.log(url.format(reqUrl));
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
