import '../styles/all.scss';
import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { withPrefix } from 'gatsby';
import Footer from './Footer';
import Navbar from './navigation/Navbar';
import useSiteMetadata from './SiteMetadata';
import { withTrans } from '../i18n/withTrans';

const TemplateWrapper = ({ children }) => {
  const { title, description } = useSiteMetadata();
  return (
    <div>
      <Helmet>
        <html lang='en' />
        <title>{title}</title>
        <meta
          name='description'
          content={description}
        />

        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href={`${ withPrefix('/') }img/apple-touch-icon.png`}
        />
        <link
          rel='icon'
          type='image/png'
          href={`${ withPrefix('/') }img/favicon-32x32.png`}
          sizes='32x32'
        />
        <link
          rel='icon'
          type='image/png'
          href={`${ withPrefix('/') }img/favicon-16x16.png`}
          sizes='16x16'
        />

        <link
          rel='mask-icon'
          href={`${ withPrefix('/') }img/safari-pinned-tab.svg`}
          color='#ff4400'
        />
        <meta
          name='theme-color'
          content='#fff'
        />

        <meta
          property='og:type'
          content='business.business'
        />
        <meta
          property='og:title'
          content={title}
        />
        <meta
          property='og:url'
          content='/'
        />
        <meta
          property='og:image'
          content={`${ withPrefix('/') }img/og-image.jpg`}
        />
      </Helmet>
      <Navbar />
      <main id='main-container'>{children}</main>
      <Footer />
    </div>
  );
};

TemplateWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default withTrans(TemplateWrapper);
