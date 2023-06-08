// Hook pour la lecture des state, avec typage inclus
import { useAppSelector } from '../../../../../../hook/redux';

// Components
import LinksComponent from '../../LinksComponent/LinksComponent';
import LogoutComponent from '../../LogoutComponent/LogoutComponent';
import LogComponent from '../../LogComponent/LogComponent';
import Footer from '../../../Footer/Footer';

function LeftMenu(props) {
  // On récupère la state isOpen du composant parent HeaderSmall
  const { isOpen, setIsOpen } = props;
  const isLogged = useAppSelector((state) => state.user.logged);

  return (
    // On ajoute la classe active si isOpen est à true => Gestion dans le CSS ensuite
    <div className={`LeftMenu ${isOpen ? 'active' : ''}`}>
      <LinksComponent />
      {/* On transmet les props de l'ouverture du burger dans la gestion des modales connexions inscription */}

      {isLogged ? (
        <LogoutComponent setIsOpen={setIsOpen} />
      ) : (
        <LogComponent setIsOpen={setIsOpen} />
      )}
      <Footer />
    </div>
  );
}

export default LeftMenu;
