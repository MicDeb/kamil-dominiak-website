import React from 'react';
import PropTypes from 'prop-types';

export default function Hamburger({ isOpen, setOpen }) {
  return (
    <div
      onClick={setOpen}
      className={`navbar__hamburger ${ isOpen ? 'navbar__hamburger--open' : '' }`}
    >
      <div />
      <div />
      <div />
    </div>
  );
}

Hamburger.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};
