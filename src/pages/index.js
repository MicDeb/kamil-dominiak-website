import React from 'react';
import { Link } from 'gatsby';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import { Carousel, Typography, Space } from 'antd';
import { homePagePhotos } from 'src/helpers/homePagePhotos';
import BlogRoll from 'src/components/BlogRoll';

const Index = () => {
  const { t } = useTranslation();
  const {
    Title, Paragraph,
  } = Typography;
  return (
    <section className='section'>
      <Helmet title='Kamil Dominiak - official website' />
      <div className='home-page-container'>
        <Space
          direction='vertical'
          size={40}
        >
          <div className='aspectratio-container aspect-2-3 fit-height'>
            <div className='aspectratio-content'>
              <Carousel
                key='images-slider'
                autoplay
                effect='fade'
              >
                {homePagePhotos.map((photo) => (
                  <div key={photo.index}>
                    <img
                      src={photo.src}
                      alt={photo.alt}
                    />
                  </div>
                ))}
              </Carousel>
            </div>
          </div>

          <Typography>
            <Title level={3}>
              {t('about.main')}
            </Title>
            <Paragraph>
              {t('about.educationParam')}
            </Paragraph>
            <Link to='/about'>{t('read_more')}</Link>
          </Typography>

          <div>
            <Title level={3}>
              {t('home.recent_post')}
            </Title>
            <BlogRoll />
          </div>
        </Space>
      </div>
    </section>
  );
};

export default Index;
