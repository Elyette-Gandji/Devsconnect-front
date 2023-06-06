import Burger from './Burger/Burger';
import Title from '../Title/Title';
import NavComponent from '../NavComponent/NavComponent';
import LogComponent from '../LogComponent/LogComponent';

function HeaderSmall() {
  return (
    <>
      <div className="Header">
        <Burger />
        <Title />

        {/* Quand isOpen est true, on ajoute une classe à ..., et ce ... à une transition CSS de left -100vw vers left 0 */}
      </div>
      <nav>
        {/* <NavComponent />
        <LogComponent /> */}
      </nav>
    </>
  );
}

export default HeaderSmall;
