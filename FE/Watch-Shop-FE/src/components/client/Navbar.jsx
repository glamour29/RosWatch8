import React from 'react';
import { NavLink } from 'react-router-dom';

// navs
const navs = [
  { to: '/client/', text: 'Home' },
  { to: '/client/contact', text: 'Contact' },
  { to: '/client/about', text: 'About' },
];

const Navbar = () => {
  const handleClassName = ({ isActive }) => {
    return `mx-3 transition-all duration-200 ease-in-out ${isActive && ' font-bold'}`;
  };

  const renderNavs = () => {
    return navs.map((nav, index) => {
      return (
        <NavLink
          key={index}
          to={nav.to}
          className={handleClassName}
        >
          {nav.text}
        </NavLink>
      );
    });
  };

  return <>{renderNavs()}</>;
};

export default Navbar;
