import React, { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Keyframes, animated } from 'react-spring/renderprops';
import delay from 'delay';
import map from 'lodash/map';
import { Link } from 'gatsby';
import { useTranslation } from 'react-i18next';
import Logo from '../Logo';
import Hamburger from './Hamburger';
import { navigationItems } from './navigationItems';

// Creates a spring with predefined animation slots
const Sidebar = Keyframes.Spring({
  // Slots can take arrays/chains,
  peek: [{ x: 0, from: { x: -100 }, delay: 500 }, { x: -100, delay: 800 }],
  // single items,
  open: { delay: 0, x: 0 },
  // or async functions with side-effects
  close: async (call) => {
    await delay(400);
    await call({ delay: 0, x: -100 });
  },
});

// Creates a keyframed trail
const Content = Keyframes.Trail({
  peek: [
    {
      x: 0, opacity: 1, from: { x: -100, opacity: 0 }, delay: 600,
    },
    { x: -100, opacity: 0, delay: 0 },
  ],
  open: { x: 0, opacity: 1, delay: 100 },
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

export default function Navigation() {
  const [open, setOpen] = useState(false);

  const toggleNavigation = useCallback(() => setOpen((prevOpen) => !prevOpen), []);

  const state = useMemo(() => (open ? 'open' : 'close'), [open]);

  return (
    <>
      <Logo />
      <Hamburger
        isOpen={open}
        setOpen={toggleNavigation}
      />
      <nav
        className={`navbar ${ state }`}
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
                      <div className={i === 0 ? 'middle' : ''}>
                        {item}
                      </div>
                    </animated.div>
                  )}
                </Content>
              </animated.div>
            </>
          )}
        </Sidebar>
      </nav>
    </>
  );
}
