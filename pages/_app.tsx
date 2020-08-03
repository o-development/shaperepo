import * as React from 'react';
import { AppPropsType } from 'next/dist/next-server/lib/utils';
import SiteLayout from '../components/layout/SiteLayout';
// Include stylesheet in a strange way
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import stylesheet from 'antd/dist/antd.min.css';

const App: React.FunctionComponent<AppPropsType> = (props) => {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
      <SiteLayout {...props} />
    </>
  );
};

export default App;
