import React from 'react';
import { Row, Col, Space, Divider } from 'antd';
import SearchBar from '../components/search/SearchBar';
import { NextPage, NextPageContext } from 'next';
import BaseProps from '../util/BaseProps';
import SchemaMetadata from '../types/SchemaMetadata';
import GridSearchResults from '../components/search/GridSearchResults';
import absoluteUrl from 'next-absolute-url';
import url from 'url';
import HttpError from '../util/HttpError';
import getErrorProps from '../util/getErrorProps';

interface HomeProps extends BaseProps {
  results?: SchemaMetadata[];
}

const Home: NextPage<HomeProps> = ({ err, results }) => {
  return (
    <Space
      direction="vertical"
      style={{ backgroundColor: '#FFF' }}
      size="large"
    >
      <Row gutter={50} style={{ flexWrap: 'wrap' }}>
        <Col span={12} style={{ minWidth: '300px' }}>
          <Space
            direction="vertical"
            align="center"
            size="large"
            style={{ width: '100%', height: '100%', justifyContent: 'center' }}
          >
            <h1 style={{ fontSize: '48px', textAlign: 'center' }}>
              Make your apps interoperable
            </h1>
            <p style={{ textAlign: 'center' }}>
              Browse a library of data shapes to help you stucture your data so
              that other apps can understand it.
            </p>
            <SearchBar />
          </Space>
        </Col>
        <Col span={12} style={{ minWidth: '300px' }}>
          <img src="/ShapeRepoSplash.png" style={{ width: '100%' }} />
        </Col>
      </Row>
      {!err && results && Array.isArray(results)
        ? [
            <Divider key="divider" orientation="left">
              {results.length} Schemas
            </Divider>,
            <GridSearchResults key="results" results={results} />,
          ]
        : null}
    </Space>
  );
};

Home.getInitialProps = async ({
  req,
  res,
}: NextPageContext): Promise<HomeProps> => {
  try {
    const { origin } = absoluteUrl(req);
    const reqUrl = url.parse(`${origin}/api/search`, true);
    reqUrl.query = { q: '_all' };
    const res = await fetch(url.format(reqUrl));
    if (res.status !== 200) {
      throw new HttpError(res.status, await res.text());
    }
    const json = await res.json();
    return {
      results: json as SchemaMetadata[],
    };
  } catch (err) {
    return getErrorProps(err, res);
  }
};

export default Home;
