import fetch from 'isomorphic-unfetch'
import { getBaseUrl, AugmentedNextPageContext } from 'util/nextPageContextUtil'
import getErrorProps from 'util/getErrorProps'
import BaseProps from 'util/BaseProps'
import Error from 'next/error'
import HttpError from 'util/HttpError'
import SchemaMetadata from 'types/SchemaMetadata'
import url from "url";

interface SearchProps extends BaseProps {
  results?: SchemaMetadata[], 
}

const Shapes = (props: SearchProps) => {
  if (props.err) {
    return <Error statusCode={props.err.status} title={props.err.message} />
  }
  return (
    <div>
      <h1>Search</h1>
      <pre>
        {JSON.stringify(props.results, null, 2)}
      </pre>
    </div>
  )
}

Shapes.getInitialProps = async ({ req, query }: AugmentedNextPageContext): Promise<SearchProps> => {
  try {
    const reqUrl = url.parse(`${getBaseUrl(req)}/api/search`, true)
    reqUrl.query = query
    const res = await fetch(url.format(reqUrl))
    if (res.status !== 200) {
      throw new HttpError(res.status, await res.text())
    }
    const json  = await res.json()
    return { results: json as SchemaMetadata[] }
  } catch(err) {
    return getErrorProps(err)
  }
}

export default Shapes
