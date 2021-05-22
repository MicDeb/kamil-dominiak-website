import React, {
  useState, useCallback, useMemo, useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { Keyframes, animated } from 'react-spring/renderprops';
import delay from 'delay';
import map from 'lodash/map';
import { Link } from 'gatsby';
import { useTranslation } from 'react-i18next';
import Hamburger from './Hamburger';
import { navigationItems, socialNavigationItems } from './navigationItems';

// Creates a spring with predefined animation slots
const Sidebar = Keyframes.Spring({
  // single items,
  open: { delay: 0, x: 0 },
  // or async functions_old with side-effects
  close: async (call) => {
    await delay(400);
    await call({ delay: 0, x: -100 });
  },
});

// Creates a keyframed trail
const Content = Keyframes.Trail({
  open: { x: 0, opacity: 1, delay: 700 },
  close: { x: -100, opacity: 0, delay: 0 },
});

const Item = ({ item }) => {
  const { t } = useTranslation();
  return (
    <Link
      className='navbar__sidebar--link'
      to={item.location}
    >
      {t(`navigation.${ item.name }`)}
    </Link>
  );
};

Item.propTypes = {
  item: PropTypes.object.isRequired,
};

const items = map(navigationItems, (item) => (
  <Item item={item} />
));

const SocialMediaItem = ({ item }) => (
  <a
    className='navbar__sidebar--social-container--link'
    href={item.location}
  >
    { item.name }
  </a>
);

SocialMediaItem.propTypes = {
  item: PropTypes.object.isRequired,
};

const socialMediaItems = map(socialNavigationItems, (item) => (
  <SocialMediaItem item={item} />
));

export default function Navigation({ location }) {
  const [open, setOpen] = useState(false);
  const [exclude, setExclude] = useState(true);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const toggleNavigation = useCallback(() => {
    setOpen((prevOpen) => !prevOpen);
    if (exclude) {
      setExclude(false);
    }
  }, [exclude]);

  const state = useMemo(() => (open ? 'open' : 'close'), [open]);

  return (
    <>
      <Hamburger
        isOpen={open}
        setOpen={toggleNavigation}
      />
      <nav
        className={`navbar ${ state } ${ exclude ? 'exclude' : '' }`}
        role='navigation'
        aria-label='main-navigation'
      >
        <Sidebar
          native
          state={state}
        >
          {({ x }) => (
            <>
              <animated.div
                className='navbar__sidebar'
                style={{
                  transform: x.interpolate((x1) => `translate3d(${ x1 }%,0,0)`),
                }}
              >
                <Content
                  native
                  items={items}
                  keys={items.map((_, i) => i)}
                  reverse={!open}
                  state={state}
                >
                  {/* eslint-disable-next-line react/prop-types */}
                  {(item, i) => ({ x: x2, ...props }) => (
                    <animated.div
                      style={{
                        // eslint-disable-next-line react/prop-types
                        transform: x2.interpolate((x3) => `translate3d(${ x3 }%,0,0)`),
                        ...props,
                      }}
                    >
                      <div
                        className={i === 0 ? 'middle' : ''}
                        onClick={toggleNavigation}
                      >
                        {item}
                      </div>
                    </animated.div>
                  )}
                </Content>

                <div className='navbar__sidebar--social-container'>
                  <Content
                    native
                    items={socialMediaItems}
                    keys={socialMediaItems.map((_, i) => i)}
                    reverse={!open}
                    state={state}
                  >

                    {/* eslint-disable-next-line react/prop-types */}
                    {(item, i) => ({ x: x2, ...props }) => (
                      <animated.div
                        style={{
                          // eslint-disable-next-line react/prop-types
                          transform: x2.interpolate((x3) => `translate3d(${ x3 }%,0,0)`),
                          ...props,
                        }}
                      >
                        <div
                          className={i === 0 ? 'middle' : ''}
                          onClick={toggleNavigation}
                        >
                          {item}
                        </div>
                      </animated.div>
                    )}
                  </Content>
                </div>
              </animated.div>
            </>
          )}
        </Sidebar>
      </nav>
    </>
  );
}

Navigation.propTypes = {
  location: PropTypes.object.isRequired,
};
