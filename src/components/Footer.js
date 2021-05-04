import React from 'react';
import map from 'lodash/map';
import { useTranslation } from 'react-i18next';
import {
  Row, Col, Typography, Space,
} from 'antd';
import { contact } from 'src/helpers/contact';
import { socialNavigationItems } from 'src/components/navigation/navigationItems';

export default function Footer() {
  const { t } = useTranslation();
  const { Link } = Typography;
  const year = new Date().getFullYear();
  return (
    <Row justify='center'>
      <Col
        xs={24}
        md={8}
      >
        {`© ${ year } Kamil Dominiak`}
      </Col>

      <Col
        xs={24}
        md={8}
      >
        {`${ t('mail') }: ${ contact.mail }`}
      </Col>

      <Col
        xs={24}
        md={8}
      >
        <Space>
          {map(socialNavigationItems, (item) => (
            <Link href={item.location}>{item.name}</Link>
          ))}
        </Space>
      </Col>
    </Row>
  );
}
