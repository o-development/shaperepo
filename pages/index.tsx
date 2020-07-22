import React, { FunctionComponent } from 'react';
import { Row, Col, Space } from 'antd';

const Home: FunctionComponent = () => {
  return (
    <div style={{ backgroundColor: '#FFF' }}>
      <Row gutter={50} style={{ flexWrap: 'wrap' }}>
        <Col span={12} style={{ minWidth: '300px' }}>
          <Space
            direction="vertical"
            align="center"
            style={{ width: '100%', height: '100%', justifyContent: 'center' }}
          >
            <h1 style={{ fontSize: '48px', textAlign: 'center' }}>Make your apps interoperable</h1>
            <p>Your apps can be interop!</p>
          </Space>
        </Col>
        <Col span={12} style={{ minWidth: '300px' }}>
          <img src="/ShapeRepoSplash.png" style={{ width: '100%' }} />
        </Col>
      </Row>
    </div>
  );
};

export default Home;
