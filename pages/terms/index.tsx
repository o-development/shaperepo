import fetch from 'isomorphic-unfetch'
import { getBaseUrl, AugmentedNextPageContext } from 'util/nextPageContextUtil'
import Error from "next/error";
import HttpError from 'util/HttpError';
import BaseProps from 'util/BaseProps';
import getErrorProps from 'util/getErrorProps';
import TermRecord from 'types/TermRecord';
import url from "url"

interface TermProps extends BaseProps {
  termRecord?: TermRecord
}

const Terms = (props: TermProps) => {
  if (props.err) {
    return <Error statusCode={props.err.status} title={props.err.message} />
  }
  return (
    <div>
      <h1>Terms</h1>
      <pre>
        {JSON.stringify(props.termRecord, null, 2)}
      </pre>
    </div>
  )
}

Terms.getInitialProps = async ({ req, query }: AugmentedNextPageContext): Promise<TermProps> => {
  try {
    const reqUrl = url.parse(`${getBaseUrl(req)}/api/term`, true)
    reqUrl.query = query
    const res = await fetch(url.format(reqUrl))
    if (res.status !== 200) {
      throw new HttpError(res.status, await res.text())
    }
    const json  = await res.json()
    return { termRecord: json as TermRecord }
  } catch (err) {
    return getErrorProps(err)
  }
}

export default Terms
