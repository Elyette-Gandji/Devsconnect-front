// Librairies
import { useAppSelector, useAppDispatch } from '../../../../../hook/redux';

import { logout } from '../../../../../store/reducer/user';

// Fonction du composant
function LogoutComponent(props) {
  // Props de la gestion du burger
  const { setIsOpen } = props;

  // On récupère la state windowWidth du reducer main
  const windowWidth = useAppSelector((state) => state.main.windowWidth);

  const dispatch = useAppDispatch();

  //* Déconnexion
  const handleLogout = () => {
    // On dispatch l'action `logout`
    dispatch(logout());
    // Si windowWidth > 768, on ignore, sinon inverse la valeur de isOpen pour fermer le burger en ouvrant la modale
    if (windowWidth > 768) {
      return;
    }
    setIsOpen(false);
  };

  return (
    <div className="Header--connect">
      <button className="Header--connect--profil" type="button">
        Mon Profil
      </button>
      <button
        onClick={handleLogout}
        className="Header--connect--logout"
        type="button"
      >
        Déconnexion
      </button>
    </div>
  );
}

export default LogoutComponent;
