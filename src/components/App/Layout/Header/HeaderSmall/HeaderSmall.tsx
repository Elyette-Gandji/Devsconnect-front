import HamburgerMenu from './HamburgerMenu';
import Title from '../Title/Title';

import './style.scss';

function HeaderSmall() {
  return (
    <div className="HeaderSmall">
      <HamburgerMenu />

      <Title />
    </div>
  );
}

export default HeaderSmall;
