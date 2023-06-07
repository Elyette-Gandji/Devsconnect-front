import LogComponent from '../LogComponent/LogComponent';
import LinksComponent from '../LinksComponent/LinksComponent';

import Title from '../Title/Title';

function HeaderLarge() {
  return (
    <div className="Header">
      <div>
        <Title />
      </div>
      <LinksComponent />
      <LogComponent />
    </div>
  );
}

export default HeaderLarge;
