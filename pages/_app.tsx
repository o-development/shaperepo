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
if (
  typeof window !== 'undefined' &&
  window.location.hostname.toLowerCase().search(productionHost) >= 0
) {
  mixpanel.init(prodToken);
}

const App: React.FunctionComponent<AppPropsType> = (props) => {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
      <SiteLayout {...props} />
    </>
  );
};

export default App;
