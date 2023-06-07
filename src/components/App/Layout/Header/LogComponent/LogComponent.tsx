import { useAppDispatch } from '../../../../../hook/redux';

import {
  toggleModalLogin,
  toggleModalSignin,
} from '../../../../../store/reducer/log';

function LogComponent(props) {
  // Props de la gestion du burger
  const { setIsOpen } = props;

  const dispatch = useAppDispatch();

  const handleLogin = () => {
    dispatch(toggleModalLogin());
    // On inverse la valeur de isOpen pour fermer le burger en ouvrant la modale
    setIsOpen(false);
  };

  const handleSignin = () => {
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
