import fetch from 'isomorphic-unfetch'
import { getBaseUrl, AugmentedNextPageContext } from 'util/nextPageContextUtil'

const Terms = ({ data }: { data: any }) => {
  return (
    <div>
      <h1>Shapes</h1>
      <pre>
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  )
}

Terms.getInitialProps = async ({ req, query }: AugmentedNextPageContext) => {
  const res = await fetch(`${getBaseUrl(req)}/api/term?id=${query.id}`)
  const json  = await res.json()
  return { data: json }
}

export default Terms
