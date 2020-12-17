import i18next from 'i18next';
import translationsPl from '../locales/pl/translations';
import translationsEn from '../locales/en/translations';

i18next.init({
  fallbackLng: 'pl',
  resources: {
    pl: {
      translations: translationsPl,
    },
    en: {
      translations: translationsEn,
    },
  },
  ns: ['translations'],
  defaultNS: 'translations',
  returnObjects: true,
  debug: process.env.NODE_ENV === 'development',
  interpolation: {
    escapeValue: false, // not needed for react!!
  },
  react: {
    wait: true,
  },
});

i18next.languages = ['pl', 'en'];

export default i18next;
