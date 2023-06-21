// ? Librairies
import { useRef, useEffect, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../../hook/redux';

// ? Fonctions externes
import { toggleModalLogin } from '../../../store/reducer/log';
import { loginUser } from '../../../store/reducer/user';

// ? Composants
import Input from '../Input';

// ? Styles
import './style.scss';

// ? Fonction principale
function Login() {
  // ? State
  // Redux
  const isLogged = useAppSelector((state) => state.user.login.logged); // Booléen pour savoir si l'utilisateur est connecté

  // ? useRef
  const modalRef = useRef(null); // Référence pour la modale

  // ? Dispatch
  const dispatch = useAppDispatch();

  // ? useNavigate
  const navigate = useNavigate();

  // ? useEffect
  //* useEffect pour fermer la modale si l'utilisateur est connecté
  useEffect(() => {
    if (isLogged) {
      dispatch(toggleModalLogin());
    }
  }, [isLogged, dispatch]);

  //* useEffect pour clic externe à la modale
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        // Si on clique en dehors de la modale
        modalRef.current &&
        !(modalRef.current as Element).contains(event.target as Node)
        // On précise que modalRef.current éun element html (Element)
        // On précise que event.target représente un noeud du DOM (Node)
      ) {
        dispatch(toggleModalLogin());
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dispatch]);

  // ? Fonctions
  /** //* Fonction pour ouvrir ou fermer la modale de connexion
   * @param {toggleModalLogin} dispatch - Dispatch de l'action pour ouvrir ou fermer la modale
   * Au clic, on dispatch l'action pour ouvrir ou fermer la modale
   */
  const handleLogin = () => {
    dispatch(toggleModalLogin());
  };

  /** //! Accessibilité
   * @param {React.KeyboardEvent<HTMLDivElement>} event - Événement clavier
   * @param {toggleModalLogin} dispatch - Dispatch de l'action pour ouvrir ou fermer la modale
   * * Une div n'est pas un element clickable par défaut.
   * On ajoute un fonction d’accessibilité pour le clavier.
   * Si la touche enter ou espace est pressée, on appelle la fonction handleLogin() juste au dessus.
   */
  const handleLoginKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'enter' || event.key === ' ') {
      handleLogin();
    }
  };

  /** //* Fonction pour soumettre le formulaire de connexion
   * @param {FormEvent<HTMLFormElement>} event - Événement formulaire
   * @param {FormData} formData - Données du formulaire
   * Au submit, on récupère les données du formulaire et on dispatch l'action de connexion réussie
   * On redirige ensuite vers la page d'accueil
   */
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // On empêche le comportement par défaut du formulaire
    const form = event.currentTarget;
    const formData = new FormData(form);

    dispatch(loginUser(formData)); // Dispatch de l'action de connexion
    navigate('/'); // Redirection vers la page d'accueil
  };

  // ? Rendu JSX
  return (
    <div className="Login">
      <div className="Login--container" ref={modalRef}>
        {' '}
        {/* On ajoute la référence pour la modale */}
        <div className="Login--container--head">
          <h2 className="Login--title">Connexion</h2>
          <div
            className="Login--close"
            role="button"
            tabIndex={0} // On précise que la div est focusable
            onClick={handleLogin} // On appelle la fonction handleLogin() au clic
            onKeyDown={handleLoginKeyDown} // On appelle la fonction handleLoginKeyDown() au clavier
          >
            X
          </div>
        </div>
        <form className="Login--form" onSubmit={handleSubmit}>
          {' '}
          {/* On appelle la fonction handleSubmit() au submit */}
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
