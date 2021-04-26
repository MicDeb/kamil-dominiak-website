import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { useTranslation } from 'react-i18next';

export default function ReadMoreButton({ to }) {
  const { t } = useTranslation();

  return (
    <Link
      to={to}
      className='read-more-btn'
    >
      <span className='read-more-btn__arrow' />
      {t('read_more')}
    </Link>
  );
}

ReadMoreButton.propTypes = {
  to: PropTypes.string.isRequired,
};
