import { useState, useEffect } from 'react';

import HeaderLarge from './HeaderLarge/HeaderLarge';
import HeaderSmall from './HeaderSmall/HeaderSmall';

import './style.scss';

function Header() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleWindowResize);

    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  return <div>{windowWidth > 768 ? <HeaderLarge /> : <HeaderSmall />}</div>;
}

export default Header;
