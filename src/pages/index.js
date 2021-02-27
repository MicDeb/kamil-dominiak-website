import React from 'react';
import { Helmet } from 'react-helmet';
import { Carousel, Typography, Space } from 'antd';
import { homePagePhotos } from 'src/helpers/homePagePhotos';

const Index = () => {
  const {
    Title, Paragraph,
  } = Typography;
  return (
    <section className='section'>
      <Helmet title='Kamil Dominiak - official website' />
      <div className='home-page-container'>
        <Space direction='vertical' size={40}>
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
                    {/* <span className='profession'>{t(professions[index])}</span> */}
                  </div>
                ))}
              </Carousel>
            </div>
          </div>

          <Typography>
            <Title level={3}>
              Nazywam się Kamil Dominiak. Jestem aktorem, wokalistą i nauczycielem emisji głosu.
            </Title>
            <Paragraph>
              Ukończyłem studia na Wydziale Aktorskim w Akademii Teatralnej w Warszawie
              oraz kurs musicalowy w Guildhall School of Music and Drama w Londynie.
            </Paragraph>

            <Paragraph>
              Moje poszukiwania skutecznej metody pracy z głosem,
              jak również czysty przypadek (jeśli istnieją przypadki)
              naprowadziły mnie na Estill Voice Training.
              Miałem przyjemność studiować tę metodę w Londynie
              pod okiem niesamowitych Maureen Scott, Charlotte Xerri oraz Anne Marie-Speed.
            </Paragraph>

            <Paragraph>
              W 2019 zdobyłem tytuł Estill Master Trainer (EMT)
              i stałem pierwszym certyfikowanym nauczycielem Estill w Polsce.
            </Paragraph>

            <Paragraph>
              Zapraszam do współpracy!
            </Paragraph>
          </Typography>
        </Space>
      </div>
    </section>
  );
};

export default Index;
