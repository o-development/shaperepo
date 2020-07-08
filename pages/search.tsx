import fetch from 'isomorphic-unfetch'
import { getBaseUrl, AugmentedNextPageContext } from 'util/nextPageContextUtil'

const Search = ({ data }: { data: any }) => {
  return (
    <div>
      <h1>Search</h1>
      <pre>
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  )
}

Search.getInitialProps = async ({ req, query }: AugmentedNextPageContext) => {
  const res = await fetch(`${getBaseUrl(req)}/api/search?q=${query.q}`)
  const json  = await res.json()
  return { data: json }
}

export default Search
