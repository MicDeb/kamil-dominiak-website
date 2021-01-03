import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Logo from 'src/components/Logo';
import Menu from './Menu';
import Hamburger from './Hamburger';

export default function Navbar() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = React.useState(false);

  const [language, setLanguage] = useState('pl');

  const handleLanguageChange = (event) => {
    i18n.changeLanguage(event.target.value);
    setLanguage(event.target.value);
  };

  const toggleHamburger = () => {
    setIsOpen((prevActive) => !prevActive);
  };

  return (
    <div className='navigation'>
      <nav
        className='navbar'
        role='navigation'
        aria-label='main-navigation'
      >
        <Logo />
        <Hamburger
          isOpen={isOpen}
          setOpen={toggleHamburger}
        />
        <Menu
          language={language}
          handleLanguageChange={handleLanguageChange}
          isOpen={isOpen}
        />
      </nav>
    </div>
  );
}
