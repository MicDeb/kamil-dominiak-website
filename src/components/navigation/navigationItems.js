import facebook from 'src/img/social/facebook.svg';
import instagram from 'src/img/social/instagram.svg';

export const navigationItems = Object.freeze([
  { location: '/', name: 'home' },
  { location: '/about', name: 'about' },
  { location: '/video', name: 'video' },
  { location: '/blog', name: 'blog' },
  { location: '/contact', name: 'contact' },
  { location: '/calendar', name: 'calendar' },
  { location: '/offer', name: 'offer' },
]);

export const socialNavigationItems = Object.freeze([
  {
    location: 'https://facebook.com',
    name: 'facebook',
    icon: facebook,
    alt: 'Facebook icon',
  },
  {
    location: '/https://instagram.com',
    name: 'instagram',
    icon: instagram,
    alt: 'Instagram icon',
  },
]);
