// ? Librairie
import { useRef, useEffect, FormEvent } from 'react';
// Permet modifier le state et de relancer le rendu de ce composant à chaque fois que le state de la modale change
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../../hook/redux';

// Actions du reducer
import { toggleModalLogin } from '../../../store/reducer/log';
import { loginUser } from '../../../store/reducer/user';

// Composants
import Input from '../Input';

// Styles
import './style.scss';

// ? Fonction
function Login() {
  const isLogged = useAppSelector((state) => state.user.login.logged);
  //! Ref pour la modale
  const modalRef = useRef(null);

  //! Dispatch
  const dispatch = useAppDispatch();

  //! useNavigate
  const navigate = useNavigate();

  //! Si connecté, on ferme la modale
  useEffect(() => {
    if (isLogged) {
      dispatch(toggleModalLogin());
    }
  }, [isLogged, dispatch]);

  //! useEffect pour clic externe à la modale
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        //* On précise que modalRef.current éun element html (Element)
        //* On précise que event.target représente un noeud du DOM (Node)
        !(modalRef.current as Element).contains(event.target as Node)
      ) {
        // Clic en dehors de la modale
        dispatch(toggleModalLogin());
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dispatch]);

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
    navigate('/'); // Redirection vers la page d'accueil
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
  );
}

export default Login;
