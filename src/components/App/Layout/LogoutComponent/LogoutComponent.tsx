// Librairies
import { useAppDispatch } from '../../../../hook/redux';

import { logout } from '../../../../store/reducer/user';

// Fonction du composant
function LogoutComponent() {
  const dispatch = useAppDispatch();

  //* Déconnexion
  const handleLogout = () => {
    // On dispatch l'action `logout`
    dispatch(logout());
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
