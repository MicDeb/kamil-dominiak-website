import React from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import {
  Carousel, Typography, Space, Divider,
} from 'antd';
import { homePagePhotos } from 'src/helpers/homePagePhotos';
import BlogRoll from 'src/components/BlogRoll';
import ReadMoreButton from 'src/components/ReadMoreButton';
import SectionHeading from 'src/components/SectionHeading';

const Index = () => {
  const { t } = useTranslation();
  const {
    Title, Paragraph,
  } = Typography;
  return (
    <section className='section'>
      <Helmet title='Kamil Dominiak - official website' />
      <div className='home-page'>
        <div className='home-page__hero'>
          <div className='home-page__hero--carousel aspectratio-container aspect-2-3 fit-height'>
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

          <Typography className='home-page__hero--text'>
            <Title level={3}>
              {t('about.home_page_main')}
            </Title>
            <Paragraph>
              {t('about.home_page_subtitle')}
            </Paragraph>
            <ReadMoreButton to='/about' />
          </Typography>
        </div>

        <Space
          direction='vertical'
          size={40}
        >
          <Divider />

          <div>
            <SectionHeading
              title='home.recent_post'
            />
            <BlogRoll />
          </div>
        </Space>
      </div>
    </section>
  );
};

export default Index;
