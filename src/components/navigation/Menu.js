import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { useTranslation } from 'react-i18next';
import map from 'lodash/map';
import { navigationItems } from './navigationItems';

export default function Menu({
  handleLanguageChange,
  language,
  isOpen,
}) {
  const { t } = useTranslation();

  return (
    <div className={`navbar__menu ${ isOpen ? 'navbar__menu--open' : '' }`}>
      <div className='navbar__menu--links'>
        {map(navigationItems, (item) => (
          <Link
            className='navbar__menu--links--item'
            to={item.location}
          >
            {t(`navigation.${ item.name }`)}
          </Link>
        ))}
      </div>

      <div className='navbar__menu--language'>
        <select
          onChange={handleLanguageChange}
          value={language}
        >
          <option value='pl'>PL</option>
          <option value='en'>EN</option>
        </select>
      </div>
    </div>
  );
}

Menu.propTypes = {
  handleLanguageChange: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
};
