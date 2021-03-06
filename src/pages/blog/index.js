import React from 'react';
import { Row, Col } from 'antd';
import BlogRoll from 'src/components/BlogRoll';

export default function BlogIndexPage() {
  return (
    <Row>
      <Col>
        <BlogRoll />
      </Col>
    </Row>
  );
}
