import '../styles/all.scss';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import includes from 'lodash/includes';
import { Helmet } from 'react-helmet';
import { withPrefix } from 'gatsby';
import {
  Layout, Row, Col, Typography,
} from 'antd';
import netlifyIdentity from 'netlify-identity-widget';
import Navigation from './navigation/Navigation';
import PageFooter from './Footer';
import useSiteMetadata from './SiteMetadata';
import { withTrans } from '../i18n/withTrans';
import Logo from './Logo';
import Spinner from './Spinner';
import { socialNavigationItems } from './navigation/navigationItems';
import Login from './Login';
import { UserContext } from '../helpers/userContext';

const TemplateWrapper = ({ children, location }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { title, description } = useSiteMetadata();

  const { Provider: UserProvider } = UserContext;

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

  useEffect(() => {
    // if (includes(location.pathname, '/calendar/events')) {
    //   // eslint-disable-next-line no-console
    //   console.log('test');
    netlifyIdentity.init({
      container: '#identity-modal',
      namePlaceholder: 'some-placeholder-for-Name',
      locale: 'pl',
    });
    //   // if (!user) {
    //   //   netlifyIdentity.open('login');
    //   // }
    // }
  }, []);

  netlifyIdentity.on('login', (currentUser) => {
    netlifyIdentity.close();
    setUser(currentUser);
  });

  netlifyIdentity.on('logout', () => setUser(null));

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
        <UserProvider value={user}>
          <Header className='header'>
            <Logo />
            <div className='header__login-and-nav'>
              {(user || includes(location.pathname, '/calendar/events')) && (
                <Login />
              )}
              <Navigation location={location} />
            </div>
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
                  <Link
                    key={item.location}
                    href={item.location}
                    target='_blank'
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </Content>
          <Footer className='footer'>
            <PageFooter />
          </Footer>
          <div id='identity-modal' />
        </UserProvider>
      </Layout>
    </>
  );
};

TemplateWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired,
};

export default withTrans(TemplateWrapper);
