// Librairies
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../../../../hook/redux';

// Typage
import { BurgerI } from '../../../../../@types/interface';

// Actions
import { logout } from '../../../../../store/reducer/user';

// Fonction du composant
function LogoutComponent(props: BurgerI) {
  // Props de la gestion du burger
  const { setIsOpen } = props;
  const userId = useAppSelector((state) => state.user.login.id);

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

  const handleClick = () => {
    // Si windowWidth > 768, on ignore, sinon inverse la valeur de isOpen pour fermer le burger en ouvrant la modale
    if (windowWidth > 768) {
      return;
    }
    setIsOpen(false);
  };

  return (
    <div className="Header--connect">
      <Link
        to={`/users/profil/${userId}`}
        className="Header--connect--profil-link"
      >
        <button
          onClick={handleClick}
          className="Header--connect--profil"
          type="button"
        >
          Mon Profil
        </button>
      </Link>
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
