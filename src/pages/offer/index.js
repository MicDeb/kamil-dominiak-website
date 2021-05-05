import React from 'react';
import { Helmet } from 'react-helmet';
import {
  Typography, Divider,
} from 'antd';
import { useTranslation } from 'react-i18next';
import IndividualLessonsPhoto from 'src/img/main/kamil-dominiak-voice-traninig.jpg';
import ConcertPhoto from 'src/img/main/kamil-dominiak-concert.jpg';
import EstilPhoto from 'src/img/estill/CertificationBadges_2020-MasterTrainer.png';

export default function Offer() {
  const { t } = useTranslation();
  const {
    Title, Paragraph,
  } = Typography;
  return (
    <section>
      <Helmet title='Kamil Dominiak - official website | offer' />

      <div className='offer-page__title'>
        <div className='offer-page__title--container'>
          <Title
            level={2}
            className='text-italic text-center'
          >
            {t('offer.quotation')}
          </Title>
          <Paragraph className='text-right'>
            Jo Estill
          </Paragraph>
        </div>
      </div>

      <Divider />

      <div className='offer-page__hero'>
        <div className='offer-page__hero--img aspectratio-container aspect-2-3 fit-height'>
          <div className='aspectratio-content'>
            <img
              src={IndividualLessonsPhoto}
              alt='Kamil Dominiak'
            />
          </div>
        </div>

        <Typography className='offer-page__hero--text'>
          <Title level={3}>
            {t('offer.individual_vocal_classes')}
          </Title>

          <Paragraph>
            {t('offer.individual_description')}
          </Paragraph>

          <Paragraph>
            {t('offer.individual_end')}
          </Paragraph>

        </Typography>
      </div>

      <div className='offer-page__hero offer-page__hero--middle'>
        <Typography className='offer-page__hero--text'>
          <Title level={3}>
            {t('offer.estill_voice_training')}
          </Title>

          <Paragraph>
            {t('offer.estill_voice_training_about_course')}
          </Paragraph>

          <Paragraph>
            {t('offer.estill_voice_training_about_estill_model')}
          </Paragraph>

          <Paragraph>
            {t('offer.estill_voice_training_level_of_advancement')}
          </Paragraph>

          <Paragraph>
            {t('offer.estill_voice_training_follow_events')}
          </Paragraph>
        </Typography>

        <div className='offer-page__hero--img aspectratio-container aspect-2-3 fit-height'>
          <div className='aspectratio-content'>
            <img
              src={EstilPhoto}
              alt='Kamil Dominiak'
            />
          </div>
        </div>
      </div>

      <div className='offer-page__hero'>
        <div className='offer-page__hero--img aspectratio-container aspect-2-3 fit-height'>
          <div className='aspectratio-content'>
            <img
              src={ConcertPhoto}
              alt='Kamil Dominiak'
            />
          </div>
        </div>

        <Typography className='offer-page__hero--text'>
          <Title level={3}>
            {t('offer.concerts')}
          </Title>

          <Paragraph>
            {t('offer.concerts_description')}
          </Paragraph>

        </Typography>
      </div>

    </section>
  );
}
