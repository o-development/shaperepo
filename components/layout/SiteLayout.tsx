import * as React from 'react';
import { Layout, Space, Button } from 'antd';
import { AppPropsType } from 'next/dist/next-server/lib/utils';
import CustomLink from '../common/CustomLink';
import SearchBar from '../search/SearchBar';
import styles from './SiteLayout.module.css';
import Head from 'next/head';

const { Header, Content, Footer } = Layout;

const SiteLayout: React.FunctionComponent<AppPropsType> = ({
  Component,
  pageProps,
}) => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Head>
        <meta property="og:image" content="/ShapeRepoSplash.png"></meta>
      </Head>
      <Header className="header">
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Space size="large">
            <CustomLink href="/">
              <img src="/ShapeRepoLogo.png" style={{ height: '28px' }} />
            </CustomLink>
            <SearchBar />
          </Space>
          <Space className={styles.headerRight}>
            <Button
              href="https://medium.com/@JacksonMorgan/making-your-solid-apps-interoperable-with-shaperepo-com-8da512936073"
              target="_blank"
            >
              Docs
            </Button>
            <Button type="primary" href="/contact">
              Submit a new Schema
            </Button>
          </Space>
        </div>
      </Header>
      <Layout>
        <Content style={{ backgroundColor: '#FFF' }}>
          <Component {...pageProps} />
        </Content>
      </Layout>
      <Footer>
        <p>
          Made by{' '}
          <CustomLink href="https://o.team" target="_blank">
            O.team
          </CustomLink>
        </p>
        <p>Contact at shaperepo@o.team</p>
      </Footer>
    </Layout>
  );
};

export default SiteLayout;
