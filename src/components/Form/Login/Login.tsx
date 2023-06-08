import { useRef, useEffect } from 'react';

// Permet de relancer le rendu de ce composant à chaque fois que le state de la modale change
import { useAppDispatch } from '../../../hook/redux';

// Actions du reducer
import { toggleModalLogin } from '../../../store/reducer/log';

// Composants
import Input from '../Input';

// Styles
import './style.scss';

function Login() {
  const modalRef = useRef(null);

  // Dispatch
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        // Clic en dehors de la modale
        dispatch(toggleModalLogin());
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogin = () => {
    // On dispatch l'action qui va gérer l'ouverture de la modale
    dispatch(toggleModalLogin());
  };

  // * Une div n'est pas un element clickable
  // * Fonction d’accessibilité pour le clavier.
  // * Si la touche enter ou espace est pressée, on appelle la fonction handleClick()
  const handleLoginKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'enter' || event.key === ' ') {
      handleLogin();
    }
  };

  return (
    <div className="Login">
      <div className="Login--container" ref={modalRef}>
        <div className="Login--container--head">
          <h2 className="Login--title">Connexion</h2>
          <div
            className="Login--close"
            role="button"
            tabIndex={0}
            onClick={handleLogin}
            onKeyDown={handleLoginKeyDown}
          >
            X
          </div>
        </div>
        <form className="Login--form">
          <Input
            name="email"
            type="email"
            placeholder="Adresse Email"
            className="Login--inputText"
          />
          <Input
            name="password"
            type="password"
            placeholder="Mot de passe"
            className="Login--inputText"
          />

          <button type="submit" className="Login--form--submit">
            Se connecter
          </button>
        </form>
        <p>DevsConnect</p>
      </div>
    </div>
  );
}

export default Login;
