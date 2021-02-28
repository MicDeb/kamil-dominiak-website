import React from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import { Typography, Space } from 'antd';
import { contact } from 'src/helpers/contact';
import ContactPhoto from 'src/img/main/kamil-dominiak015.jpg';

export default function Contact() {
  const { t } = useTranslation();
  const {
    Title, Paragraph,
  } = Typography;
  return (
    <section className='section'>
      <Helmet title='Kamil Dominiak - official website | contact' />
      <div className='contact-page-container'>
        <Space direction='vertical' size={20}>
          <Typography>
            <Title level={3}>
              {t('contact.title')}
            </Title>
          </Typography>

          <div className='aspectratio-container aspect-2-3 fit-height'>
            <div className='aspectratio-content'>
              <img
                src={ContactPhoto}
                alt='Kamil Dominiak'
              />
            </div>
          </div>

          <Typography>
            <Paragraph>
              {t('contact.subtitle')}
            </Paragraph>
            <Paragraph strong>
              {contact.mail}
            </Paragraph>
          </Typography>
        </Space>
      </div>
    </section>
  );
}
