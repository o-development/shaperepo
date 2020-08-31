import * as React from 'react';
import { AppPropsType } from 'next/dist/next-server/lib/utils';
import SiteLayout from '../components/layout/SiteLayout';
// Include stylesheet in a strange way
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import stylesheet from 'antd/dist/antd.min.css';
import mixpanel from 'mixpanel-browser';

// Init Mixpanel
const productionHost = 'shaperepo.com';
const prodToken = '335fd9d83426dab37d4e4b9946f01bf3';
mixpanel.init(prodToken);
if (
  typeof window === 'undefined' ||
  window.location.hostname.toLowerCase().search(productionHost) < 0
) {
  mixpanel.disable();
}

const App: React.FunctionComponent<AppPropsType> = (props) => {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
      <style>
        {`
          .ant-table.ant-table-bordered .ant-table-cell .ant-table.ant-table-bordered tr td:last-child,
          .ant-table.ant-table-bordered .ant-table-cell .ant-table.ant-table-bordered tr th:last-child {
            border-right: none !important;
          }
          .ant-table.ant-table-bordered .ant-table-cell .ant-table.ant-table-bordered tr th {
            border-top: 1px solid #f0f0f0;
          }
        `}
      </style>
      <SiteLayout {...props} />
    </>
  );
};

export default App;
