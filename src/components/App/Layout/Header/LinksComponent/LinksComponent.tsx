// ? Librairies
import { NavLink, Navigate, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../../hook/redux';

// ? Fonctions externes
import { toggleModalLogin } from '../../../../../store/reducer/log';

// ? Typage global
import { BurgerI } from '../../../../../@types/interface';

// ? Fonction principale
function LinksComponent(props: BurgerI) {
  const { setIsOpen } = props; // Props de la gestion du burger

  // ? State
  // Redux
  const windowWidth = useAppSelector((state) => state.main.windowWidth); // On récupère la state windowWidth pour la taille de la fenêtre
  const isLoggedIn = useAppSelector((state) => state.user.login.logged); // On récupère la state logged pour savoir si l'utilisateur est connecté

  // ? useNavigate
  const navigate = useNavigate();

  // ? useDispatch
  const dispatch = useAppDispatch();

  // ? Fonctions
  /** //* Fermeture du burger
   * Au clic sur le lien, on ferme le burger
   * Si windowWidth > 768, on ignore
   */
  const handleClick = () => {
    if (windowWidth > 768) {
      return;
    }
    setIsOpen(false);
  };

  /** //! Accessibilité
   * Une div n'est pas un element clickable par défaut.
   * @param {React.KeyboardEvent<HTMLDivElement>} event - event du clavier
   * On ajoute un fonction d’accessibilité pour le clavier.
   * Si la touche enter ou espace est pressée, on appelle la fonction handleClick() juste au dessus.
   */
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleClick();
    }
  };

  /** //todo Créer mon projet
   * @param {void} handleCreateProjectClick - Clic sur le bouton
   * Si on est pas connecté, on ouvre la modale de connexion au lieu de rediriger vers la page de création de projet
   * Si on est connecté, on redirige vers la page de création de projet
   */

  // ? Rendu JSX
  return (
    <ul className="Header--ul">
      <div
        role="button"
        onKeyDown={handleKeyDown} // A l'appui sur une touche du clavier, on appelle la fonction handleKeyDown
        tabIndex={0} // On rend le composant focusable
        onClick={handleClick} // Au clic sur le lien, on appelle la fonction handleCreateProjectClick
        className="Header--ul--link"
      >
        {/** //! NavLink
         * @param {Function} NavLink - Permet de naviguer entre les pages
         * @param {string} to - On envoie l'ID du projet dans l'url
         * Permet de naviguer vers la page /create-my-project
         */}
        <NavLink to="/create-my-project">Créer mon projet</NavLink>
      </div>
      <div
        role="button"
        onKeyDown={handleKeyDown} // A l'appui sur une touche du clavier, on appelle la fonction handleKeyDown
        tabIndex={0} // On rend le composant focusable
        onClick={handleClick} // Au clic sur le lien, on appelle la fonction handleClick
        className="Header--ul--link"
      >
        {/** //! NavLink
         * @param {Function} NavLink - Permet de naviguer entre les pages
         * @param {string} to - On envoie l'ID du projet dans l'url
         * Permet de naviguer vers la page /users
         */}
        <NavLink to="/users">Les profils</NavLink>
      </div>
      <div
        role="button"
        onKeyDown={handleKeyDown} // A l'appui sur une touche du clavier, on appelle la fonction handleKeyDown
        tabIndex={0} // On rend le composant focusable
        onClick={handleClick} // Au clic sur le lien, on appelle la fonction handleClick
        className="Header--ul--link"
      >
        {/** //! NavLink
         * @param {Function} NavLink - Permet de naviguer entre les pages
         * @param {string} to - On envoie l'ID du projet dans l'url
         * Permet de naviguer vers la page /users
         */}
        <NavLink to="/projects">Les projets</NavLink>
      </div>
    </ul>
  );
}

export default LinksComponent;
