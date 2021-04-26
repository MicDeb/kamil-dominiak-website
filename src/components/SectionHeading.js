import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

export default function SectionHeading({ title }) {
  const { t } = useTranslation();

  return (
    <h2 className='section-heading'>
      {t(title)}
    </h2>
  );
}

SectionHeading.propTypes = {
  title: PropTypes.string.isRequired,
};
