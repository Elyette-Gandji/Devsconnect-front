import './style.scss';
import { useState } from 'react';
import NavComponent from '../NavComponent/NavComponent';

function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button
        className={`hamburger ${isOpen ? 'open' : ''}`}
        onClick={handleClick}
      >
        <span />
        <span />
        <span />
      </button>

      <div className={`menu ${isOpen ? 'open' : ''}`}>
        <NavComponent />
      </div>
    </div>
  );
}

export default HamburgerMenu;
