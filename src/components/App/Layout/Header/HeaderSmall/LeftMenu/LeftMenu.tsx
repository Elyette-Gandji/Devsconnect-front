import LogComponent from '../../LogComponent/LogComponent';
import LinksComponent from '../../LinksComponent/LinksComponent';
import Footer from '../../../Footer/Footer';

function LeftMenu(props) {
  // On récupère la state isOpen du composant parent HeaderSmall
  const { isOpen, setIsOpen } = props;

  return (
    // On ajoute la classe active si isOpen est à true => Gestion dans le CSS ensuite
    <div className={`LeftMenu ${isOpen ? 'active' : ''}`}>
      <LinksComponent />
      {/* On transmet les props de l'ouverture du burger dans la gestion des modales connexions inscription */}
      <LogComponent setIsOpen={setIsOpen} />
      <Footer />
    </div>
  );
}

export default LeftMenu;
