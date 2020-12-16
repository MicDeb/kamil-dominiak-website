import React, { useEffect, useState } from "react";
import { Link } from "gatsby";
import { useTranslation } from "react-i18next"
import logo from "../img/logo.svg";

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const [active, setActive] = useState(false);
  const [navBarActiveClass, setNavBarActiveClass] = useState("");

  const [language, setLanguage] = useState('pl');

  const handleLanguageChange = (event) => {
    i18n.changeLanguage(event.target.value)
    setLanguage(event.target.value);
  }

  useEffect(() => {
    let navbarClass = "";
    if (active) {
      navbarClass = "is-active";
    }
    setNavBarActiveClass(navbarClass);
  }, [active]);

  const toggleHamburger = () => {
    setActive((prevActive) => !prevActive);
  };

  console.log('language', language);

  return (
    <nav
      className="navbar is-transparent"
      role="navigation"
      aria-label="main-navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item" title="Logo">
            <img src={logo} alt="Kaldi" style={{ width: "88px" }} />
          </Link>
          {/* Hamburger menu */}
          <div
            className={`navbar-burger burger ${navBarActiveClass}`}
            data-target="navMenu"
            onClick={toggleHamburger}
          >
            <span />
            <span />
            <span />
          </div>
        </div>
        <div id="navMenu" className={`navbar-menu ${navBarActiveClass}`}>
          <div className="navbar-start has-text-centered">
            <Link className="navbar-item" to="/about">
              {t('navigation.about')}
            </Link>
            <Link className="navbar-item" to="/products">
              {t('navigation.video')}
            </Link>
            <Link className="navbar-item" to="/blog">
              {t('navigation.blog')}
            </Link>
            <Link className="navbar-item" to="/contact">
              {t('navigation.offer')}
            </Link>
            <Link className="navbar-item" to="/contact/examples">
              {t('navigation.calendar')}
            </Link>
            <Link className="navbar-item" to="/contact/examples">
              {t('navigation.contact')}
            </Link>
          </div>

          <div className="field">
            <div className="control has-icons-left">
              <div className="select">
                <select
                  onChange={handleLanguageChange}
                  value={language}
                >
                  <option  value="pl">PL</option>
                  <option  value="en">EN</option>
                </select>
              </div>
              <span className="icon is-left">
              <i className="fas fa-globe"></i>
            </span>
            </div>
          </div>


        </div>
      </div>
    </nav>
  );
}
