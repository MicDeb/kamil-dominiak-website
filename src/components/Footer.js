import React from 'react';
import { Link } from 'gatsby';
import map from 'lodash/map';
import { useTranslation } from 'react-i18next';
import {
  navigationItems,
  socialNavigationItems,
} from './navigation/navigationItems';

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className='footer'>
      <ul className='footer__navigation'>
        {map(navigationItems, (item) => (
          <li className='footer__navigation--item'>
            <Link
              className='navbar-item'
              to={item.location}
            >
              {t(`navigation.${ item.name }`)}
            </Link>
          </li>
        ))}
      </ul>

      <div className='footer__social'>
        {map(socialNavigationItems, (socialItem) => (
          <a
            title={socialItem.title}
            href={socialItem.location}
          >
            <img
              src={socialItem.icon}
              alt={socialItem.alt}
              style={{ width: '1em', height: '1em' }}
            />
          </a>
        ))}
      </div>
    </footer>
  );
}
