import '../styles/all.scss';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import { Helmet } from 'react-helmet';
import { withPrefix } from 'gatsby';
import {
  Layout, Row, Col, Typography,
} from 'antd';
import Navigation from './navigation/Navigation';
import PageFooter from './Footer';
import useSiteMetadata from './SiteMetadata';
import { withTrans } from '../i18n/withTrans';
import Logo from './Logo';
import Spinner from './Spinner';
import { socialNavigationItems } from './navigation/navigationItems';

const TemplateWrapper = ({ children, location }) => {
  const [loading, setLoading] = useState(true);
  const { title, description } = useSiteMetadata();

  const { Header, Footer, Content } = Layout;
  const { Link } = Typography;

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => {
      setLoading(true);
      clearTimeout(timer);
    };
  }, [location]);

  return (
    <>
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
          content={`${ withPrefix('/') }img/kamil-dominiak004.jpg`}
        />
      </Helmet>

      <Layout>
        <Header className='header'>
          <Logo />
          <Navigation location={location} />
        </Header>
        <Content>
          <div id='main-container'>
            {loading && <Spinner />}

            <Row>
              <Col xs={24}>
                {children}
              </Col>
            </Row>

            <div className='social-media-vertical-nav'>
              {map(socialNavigationItems, (item) => (
                <Link href={item.location}>{item.name}</Link>
              ))}
            </div>
          </div>
        </Content>
        <Footer className='footer'>
          <PageFooter />
        </Footer>
      </Layout>

    </>
  );
};

TemplateWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired,
};

export default withTrans(TemplateWrapper);
