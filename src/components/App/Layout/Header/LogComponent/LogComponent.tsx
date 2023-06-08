// Permet de relancer le rendu de ce composant à chaque fois que le state de la modale change
import { useAppDispatch } from '../../../../../hook/redux';

// Actions du reducer
import {
  toggleModalLogin,
  toggleModalSignin,
} from '../../../../../store/reducer/log';

// Fonction du composant
function LogComponent(props) {
  // Props de la gestion du burger
  const { setIsOpen } = props;

  // Dispatch
  const dispatch = useAppDispatch();

  // Fonctions
  const handleLogin = () => {
    // On dispatch l'action qui va gérer l'ouverture de la modale
    dispatch(toggleModalLogin());
    // On inverse la valeur de isOpen pour fermer le burger en ouvrant la modale
    setIsOpen(false);
  };

  const handleSignin = () => {
    // On dispatch l'action qui va gérer l'ouverture de la modale
    dispatch(toggleModalSignin());
    // On inverse la valeur de isOpen pour fermer le burger en ouvrant la modale
    setIsOpen(false);
  };
  return (
    <div className="Header--connect">
      <button
        onClick={handleLogin}
        className="Header--connect--login"
        type="button"
      >
        Connexion
      </button>
      <button
        onClick={handleSignin}
        className="Header--connect--subscribe"
        type="button"
      >
        Inscription
      </button>
    </div>
  );
}

export default LogComponent;
