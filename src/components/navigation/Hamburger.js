import React from 'react';
import PropTypes from 'prop-types';

export default function Hamburger({ isOpen, setOpen }) {
  return (
    <div
      onClick={setOpen}
      className={`hamburger ${ isOpen ? 'hamburger--open' : '' }`}
    >
      <div />
      <div />
      <div />
    </div>
  );
}

Hamburger.defaultProps = {
  isOpen: false,
};

Hamburger.propTypes = {
  setOpen: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
};
