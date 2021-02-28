import React from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import { Typography, Space } from 'antd';
import AboutPhoto from 'src/img/main/kamil-dominiak002.jpg';
// eslint-disable-next-line import/extensions,import/no-unresolved
import CV_PL from 'static/img/kamil_dominiak_cv.pdf';
// eslint-disable-next-line import/extensions,import/no-unresolved
import CV_EN from 'static/img/kamil_dominiak_resume.pdf';

export default function Contact() {
  const { t } = useTranslation();
  const {
    Title, Paragraph, Link, Text,
  } = Typography;
  return (
    <section className='section'>
      <Helmet title='Kamil Dominiak - official website | contact' />
      <div className='about-page-container'>
        <Space
          direction='vertical'
          size={20}
        >
          <div className='aspectratio-container aspect-2-3 fit-height'>
            <div className='aspectratio-content'>
              <img
                src={AboutPhoto}
                alt='Kamil Dominiak'
              />
            </div>
          </div>

          <Typography>
            <Title level={3}>
              {t('about.main')}
            </Title>
          </Typography>

          <Typography>
            <Paragraph>
              {t('about.educationParam')}
            </Paragraph>
            <Paragraph>
              {t('about.estillParamFirst')}
            </Paragraph>
            <Paragraph>
              {t('about.estillParamSecond')}
            </Paragraph>
            <Paragraph>
              {t('about.workWithMe')}
            </Paragraph>
          </Typography>

          <Typography>
            <Paragraph>
              <Space
                size={10}
              >
                <Text>
                  {t('download_cv')}
                  :
                </Text>

                <Link
                  href={CV_PL}
                  target='_blank'
                >
                  PL
                </Link>
                <Link
                  href={CV_EN}
                  target='_blank'
                >
                  EN
                </Link>
              </Space>
            </Paragraph>
          </Typography>
        </Space>
      </div>
    </section>
  );
}
