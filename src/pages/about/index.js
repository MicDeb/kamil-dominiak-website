import React from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import { Typography, Space } from 'antd';
import AboutPhoto from 'src/img/main/kamil-dominiak002.jpg';
import AboutPhoto1 from 'src/img/main/kamil-dominiak009.jpg';
import AboutPhoto2 from 'src/img/main/kamil-dominiak004.jpg';
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

      <div className='about-page__hero'>
        <div className='about-page__hero--img aspectratio-container aspect-2-3 fit-height'>
          <div className='aspectratio-content'>
            <img
              src={AboutPhoto}
              alt='Kamil Dominiak'
            />
          </div>
        </div>

        <Typography className='about-page__hero--text'>
          <Title level={3}>
            {t('about.main')}
          </Title>

          <Paragraph>
            {t('about.education_param')}
          </Paragraph>

          <Paragraph>
            {t('about.estill_param_first')}
          </Paragraph>

          <Paragraph>
            {t('about.estill_param_second')}
          </Paragraph>
        </Typography>
      </div>

      <div className='about-page__hero about-page__hero--middle'>
        <Typography className='about-page__hero--text'>
          <Paragraph>
            {t('about.daria_iwinska_param')}
          </Paragraph>

          <Paragraph>
            {t('about.cooperation_with_theaters')}
          </Paragraph>
        </Typography>

        <div className='about-page__hero--img aspectratio-container aspect-2-3 fit-height'>
          <div className='aspectratio-content'>
            <img
              src={AboutPhoto1}
              alt='Kamil Dominiak'
            />
          </div>
        </div>
      </div>

      <div className='about-page__hero'>
        <div className='about-page__hero--img aspectratio-container aspect-2-3 fit-height'>
          <div className='aspectratio-content'>
            <img
              src={AboutPhoto2}
              alt='Kamil Dominiak'
            />
          </div>
        </div>
        <Typography className='about-page__hero--text'>
          <Paragraph>
            {t('about.other_artistic_endeavors')}
          </Paragraph>

          <Paragraph>
            {t('about.end_param')}
          </Paragraph>

          <Paragraph>
            {t('about.work_with_me')}
          </Paragraph>
        </Typography>
      </div>

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
    </section>
  );
}
