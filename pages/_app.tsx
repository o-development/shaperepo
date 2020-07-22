import * as React from 'react';

// Include stylesheet in a strange way
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import stylesheet from 'antd/dist/antd.min.css';

import { Layout } from 'antd';
import { AppPropsType } from 'next/dist/next-server/lib/utils';
import CustomLink from '../components/common/CustomLink';

const { Header, Content } = Layout;

const App: React.FunctionComponent<AppPropsType> = ({ Component, pageProps }) => {
  return (
    <Layout>
      <style dangerouslySetInnerHTML={{ __html: stylesheet }} />

      <Header className="header">
        <CustomLink href="/">
          <img src="/ShapeRepoLogo.png" style={{ height: '28px' }} />
        </CustomLink>
      </Header>
      <Layout>
        <Content style={{ padding: '50px', backgroundColor: '#FFF' }}>
          <Component {...pageProps} />
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
