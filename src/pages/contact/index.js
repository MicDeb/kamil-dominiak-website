import React from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import Separator from '../../components/Separator';

export default function Contact() {
  const { t } = useTranslation();
  return (
    <section className='section'>
      <Helmet title='Kamil Dominiak - official website | contact' />
      <div className='contact-page-container'>
        <h2 className='contact-page__title'>{t('contact.title')}</h2>
        <Separator />
        <p className='contact-page__subtitle'>{t('contact.subtitle')}</p>
        <p className='contact-page__email'>kamildominiak@gmail.com</p>
      </div>
    </section>
  );
}
