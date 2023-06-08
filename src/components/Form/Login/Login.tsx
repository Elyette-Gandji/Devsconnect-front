// ? Librairie
import { useRef, useEffect, FormEvent } from 'react';

// Permet modifier le state et de relancer le rendu de ce composant à chaque fois que le state de la modale change
import { useAppSelector, useAppDispatch } from '../../../hook/redux';

// Actions du reducer
import { toggleModalLogin } from '../../../store/reducer/log';
import { loginUser, logout } from '../../../store/reducer/user';

// Composants
import Input from '../Input';
import FlashMessage from '../FlashMessage/FlashMessage';

// Styles
import './style.scss';

function Login() {
  const pseudo = useAppSelector((state) => state.user.pseudo);
  const isLogged = useAppSelector((state) => state.user.logged);
  const flash = useAppSelector((state) => state.user.message);

  //! Ref pour la modale
  const modalRef = useRef(null);

  //! Dispatch
  const dispatch = useAppDispatch();

  //! useEffect pour clic externe à la modale
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

  //! Fonction pour fermer la modale avec la croix
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

  //! Fonction pour soumettre le formulaire
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // On récupère les données du formulaire
    const form = event.currentTarget;
    const formData = new FormData(form);

    dispatch(loginUser(formData)); // Dispatch de l'action de connexion réussie
    dispatch(toggleModalLogin()); // Dispatch de l'action qui va gérer la fermeture de la modale
  };

  return (
    <div className="">
      {/* //? Si on a un message flash, on l'affiche, sinon on n'affiche rien */}
      {/* // ? On utilise le composant `FlashMessage` pour afficher le message */}
      {/* //? On utilise la propriété `children` pour afficher le contenu du message flash */}
      {flash &&
        (console.log(flash),
        (
          <FlashMessage type={flash.type} duration={flash.duration ?? 3000}>
            {flash.children}
          </FlashMessage>
        ))}

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
          <form className="Login--form" onSubmit={handleSubmit}>
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
    </div>
  );
}

export default Login;
