import LogComponent from '../../LogComponent/LogComponent';
import LinksComponent from '../../LinksComponent/LinksComponent';
import Footer from '../../../Footer/Footer';

import './style.scss';

function LeftMenu(props) {
  // On récupère la state isOpen du composant parent HeaderSmall
  const { isOpen } = props;

  return (
    // On ajoute la classe active si isOpen est à true => Gestion dans le CSS ensuite
    <div className={`LeftMenu ${isOpen ? 'active' : ''}`}>
      <LinksComponent />
      <LogComponent />
      <Footer />
    </div>
  );
}

export default LeftMenu;
