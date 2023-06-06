import LogComponent from '../LogComponent/LogComponent';
import NavComponent from '../NavComponent/NavComponent';

import Title from '../Title/Title';

function HeaderLarge() {
  return (
    <div className="Header">
      <div>
        <Title />
      </div>
      <NavComponent />
      <LogComponent />
    </div>
  );
}

export default HeaderLarge;
