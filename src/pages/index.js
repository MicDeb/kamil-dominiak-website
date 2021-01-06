import React from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import Separator from 'src/components/Separator';

const Index = () => {
  const { t } = useTranslation();

  return (
    <section className='section'>
      <Helmet title='Kamil Dominiak - official website' />
      <div className='home-page-container'>
        <h2 className='home-page__title'>Kamil Dominiak</h2>
        <Separator />
        <p className='home-page__subtitle'>{t('home.subtitle')}</p>
      </div>
    </section>
  );
};

export default Index;
