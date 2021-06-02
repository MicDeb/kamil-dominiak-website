import facebook from 'src/img/social/facebook.svg';
import instagram from 'src/img/social/instagram.svg';

export const navigationItems = Object.freeze([
  { location: '/', name: 'home' },
  { location: '/about', name: 'about' },
  { location: '/video', name: 'video' },
  { location: '/blog', name: 'blog' },
  { location: '/calendar', name: 'calendar' },
  { location: '/offer', name: 'offer' },
  { location: '/contact', name: 'contact' },
]);

export const socialNavigationItems = Object.freeze([
  {
    location: 'https://m.facebook.com/profile.php?id=101696992069102&ref=content_filter',
    name: 'facebook',
    icon: facebook,
    alt: 'Facebook icon',
  },
  {
    location: 'https://www.instagram.com/kamildominiak/',
    name: 'instagram',
    icon: instagram,
    alt: 'Instagram icon',
  },
]);
