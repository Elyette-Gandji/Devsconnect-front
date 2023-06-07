function LogComponent(props) {
  // Props de la gestion du burger
  const {
    isOpen,
    setIsOpen,
    modalLogin,
    setModalLogin,
    modalSignin,
    setModalSignin,
  } = props;

  const handleLogin = () => {
    setModalLogin(!modalLogin);
    // Si on ouvre login on ferme signin
    setModalSignin(false);
    // On inverse la valeur de isOpen pour fermer le burger en ouvrant la modale
    setIsOpen(false);
  };

  const handleSignin = () => {
    setModalSignin(!modalSignin);
    // Si on ouvre signin on ferme login
    setModalLogin(false);
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
