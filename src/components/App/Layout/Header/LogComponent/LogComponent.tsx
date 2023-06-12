// Permet de lire les state du store et d'effectuer des actions sur le store
import { useAppSelector, useAppDispatch } from '../../../../../hook/redux';

// Typage
import { BurgerI } from '../../../../../@types/interface';
// Actions du reducer
import {
  toggleModalLogin,
  toggleModalSignin,
} from '../../../../../store/reducer/log';

// Fonction du composant
function LogComponent(props: BurgerI) {
  // Props de la gestion du burger
  const { setIsOpen } = props;

  // On récupère la state windowWidth du reducer main
  const windowWidth = useAppSelector((state) => state.main.windowWidth);

  // Dispatch
  const dispatch = useAppDispatch();

  // Fonctions
  const handleLogin = () => {
    // On dispatch l'action qui va gérer l'ouverture de la modale
    dispatch(toggleModalLogin());
    // Si windowWidth > 768, on ignore, sinon inverse la valeur de isOpen pour fermer le burger en ouvrant la modale
    if (windowWidth > 768) {
      return;
    }
    setIsOpen(false);
  };

  const handleSignin = () => {
    // On dispatch l'action qui va gérer l'ouverture de la modale
    dispatch(toggleModalSignin());
    // Si windowWidth > 768, on ignore, sinon inverse la valeur de isOpen pour fermer le burger en ouvrant la modale
    if (windowWidth > 768) {
      return;
    }
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
