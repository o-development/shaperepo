import fetch from 'isomorphic-unfetch'
import { getBaseUrl, AugmentedNextPageContext } from 'util/nextPageContextUtil'
import getErrorProps from 'util/getErrorProps'
import BaseProps from 'util/BaseProps'
import Error from 'next/error'
import SchemaRecord from 'types/SchemaRecord'
import HttpError from 'util/HttpError'
import url from 'url'

interface ShapeProps extends BaseProps {
  schemaRecord?: SchemaRecord, 
}

const Shapes = (props: ShapeProps) => {
  if (props.err) {
    return <Error statusCode={props.err.status} title={props.err.message} />
  }
  return (
    <div>
      <h1>Shapes</h1>
      <pre>
        {JSON.stringify(props.schemaRecord, null, 2)}
      </pre>
    </div>
  )
}

Shapes.getInitialProps = async ({ req, query }: AugmentedNextPageContext): Promise<ShapeProps> => {
  try {
    const reqUrl = url.parse(`${getBaseUrl(req)}/api/search`, true)
    reqUrl.query = query
    const res = await fetch(url.format(reqUrl))
    if (res.status !== 200) {
      throw new HttpError(res.status, await res.text())
    }
    const json  = await res.json()
    return { schemaRecord: json as SchemaRecord }
  } catch(err) {
    return getErrorProps(err)
  }
}

export default Shapes
