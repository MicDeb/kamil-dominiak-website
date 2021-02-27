import React from 'react';
import { useTranslation } from 'react-i18next';
import map from 'lodash/map';
import { Row, Col } from 'antd';
import { contact } from 'src/helpers/contact';
import { socialNavigationItems } from './navigation/navigationItems';

export default function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();
  return (
    <>
      <Row justify='center'>
        <Col xs={24}>
          {`© ${ year } Kamil Dominiak`}
        </Col>
        <Col xs={24}>
          {`${ t('mail') }: ${ contact.mail }`}
        </Col>
        <Col xs={24}>
          {`${ t('phone') }: ${ contact.phone }`}
        </Col>
      </Row>
      <Row justify='center'>
        <Col xs={24}>
          {map(socialNavigationItems, (socialItem) => (
            <a
              title={socialItem.title}
              href={socialItem.location}
            >
              <img
                src={socialItem.icon}
                alt={socialItem.alt}
                style={{ width: '1em', height: '1em' }}
              />
            </a>
          ))}
        </Col>
      </Row>
    </>
  );
}
