import React from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import { Typography } from 'antd';
import { contact } from 'src/helpers/contact';
import ContactPhoto from 'src/img/main/kamil-dominiak019.jpg';

export default function Contact() {
  const { t } = useTranslation();
  const {
    Title, Paragraph,
  } = Typography;
  return (
    <section className='section'>
      <Helmet title='Kamil Dominiak - official website | contact' />
      <div className='contact-page__hero'>

        <div className='contact-page__hero--img aspectratio-container aspect-2-3 fit-height'>
          <div className='aspectratio-content'>
            <img
              src={ContactPhoto}
              alt='Kamil Dominiak'
            />
          </div>
        </div>

        <Typography className='contact-page__hero--text'>
          <Typography>
            <Title level={3}>
              {t('contact.title')}
            </Title>
          </Typography>
          <Paragraph>
            {t('contact.subtitle')}
          </Paragraph>
          <Paragraph
            className='contact-email'
            strong
          >
            {contact.mail}
          </Paragraph>
        </Typography>

      </div>
    </section>
  );
}
