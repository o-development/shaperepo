import React from 'react';
import fetch from 'isomorphic-unfetch';
import Error from 'next/error';
import HttpError from '../../util/HttpError';
import BaseProps from '../../util/BaseProps';
import getErrorProps from '../../util/getErrorProps';
import TermRecord from '../../types/TermRecord';
import url from 'url';
import TermsPage from '../../components/terms/TermsPage';
import { NextPage, NextPageContext } from 'next';
import absoluteUrl from 'next-absolute-url';
import Head from 'next/head';
import mixpanel from 'mixpanel-browser';

interface TermProps extends BaseProps {
  termRecord?: TermRecord;
}

const Terms: NextPage<TermProps> = (props: TermProps) => {
  if (props.err) {
    return <Error statusCode={props.err.status} title={props.err.message} />;
  }
  if (!props.termRecord) {
    return <Error statusCode={500} title="No Term Found" />;
  }
  mixpanel.track('Term', { id: props.termRecord._id });
  return (
    <>
      <Head>
        <title>{props.termRecord.label} - ShapeRepo</title>
      </Head>
      <TermsPage term={props.termRecord} />
    </>
  );
};

Terms.getInitialProps = async ({
  req,
  res,
  query,
}: NextPageContext): Promise<TermProps> => {
  try {
    const { origin } = absoluteUrl(req);
    const reqUrl = url.parse(`${origin}/api/term`, true);
    reqUrl.query = query;
    const fetchRes = await fetch(url.format(reqUrl));
    if (fetchRes.status !== 200) {
      throw new HttpError(fetchRes.status, await fetchRes.text());
    }
    const json = await fetchRes.json();
    return { termRecord: json as TermRecord };
  } catch (err) {
    return getErrorProps(err, res);
  }
};

export default Terms;
