import React from 'react';
import { Link } from 'gatsby';

export default function Logo() {
  return (
    <Link to='/'>
      <div className='logo'>
        <div className='logo__item'>
          <p>
            <span>K</span>
            <span>D</span>
          </p>
          <p>
            <span>D</span>
            <span>K</span>
          </p>
        </div>
      </div>
    </Link>
  );
}
