import { useState } from 'react';
import Signin from '../../../../Form/Signin/signin';
import Login from '../../../../Form/Login/Login';

function LogComponent(props) {
  // Props de la gestion du burger
  const { isOpen, setIsOpen } = props;

  const [modalLogin, setModalLogin] = useState(false);
  const [modalSignin, setModalSignin] = useState(false);

  const handleLogin = () => {
    setModalLogin(!modalLogin);
    setModalSignin(false);
    // On inverse la valeur de isOpen pour fermer le burger en ouvrant la modale
    setIsOpen(!isOpen);
  };

  const handleSignin = () => {
    setModalSignin(!modalSignin);
    setModalLogin(false);
    // On inverse la valeur de isOpen pour fermer le burger en ouvrant la modale
    setIsOpen(!isOpen);
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

      {modalLogin && <Login />}
      {modalSignin && <Signin />}
    </div>
  );
}

export default LogComponent;
