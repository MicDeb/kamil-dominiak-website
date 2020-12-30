import React from 'react';
import { Helmet } from 'react-helmet';
import Separator from 'src/components/Separator';

const Index = () => (
  <section className='section'>
    <Helmet title='Kamil Dominiak - official website' />
    <div className='home-page-container'>
      <h2 className='home-page__title'>Kamil Dominiak</h2>
      <Separator />
      <p className='home-page__subtitle'>Aktor | Wokalista | Trener wokalny</p>
    </div>
  </section>
);

export default Index;
