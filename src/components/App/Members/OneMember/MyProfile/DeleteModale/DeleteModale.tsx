// ? Librairie
import { useRef, useEffect, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../../../../../hook/redux';

// ? Fonctions externes
import { deleteMember } from '../../../../../../store/reducer/members';
import { logout } from '../../../../../../store/reducer/user';

// ? Composants

// ? Styles
import './style.scss';

// ? Fonction principale
function DeleteModale({
  isOpenDeleteModale,
  setIsOpenDeleteModale,
}: {
  isOpenDeleteModale: boolean;
  setIsOpenDeleteModale: (isOpen: boolean) => void;
}) {
  // ? States
  // Redux
  const id = useAppSelector((state) => state.user.login.id); // id du membre connecté

  // ? useRef
  const modalRef = useRef(null); // Permet de cibler la modale

  // ? Dispatch
  const dispatch = useAppDispatch();

  // ? useNavigate
  const navigate = useNavigate(); // Permet d'acceder à l'historique de navigation, pour rediriger

  // ? useEffect
  //* Pour le clic externe à la modale
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        // Si on clique en dehors de la modale
        modalRef.current &&
        !(modalRef.current as Element).contains(event.target as Node)
        // On précise que modalRef.current éun element html (Element)
        // On précise que event.target représente un noeud du DOM (Node)
      ) {
        setIsOpenDeleteModale(!isOpenDeleteModale);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpenDeleteModale, setIsOpenDeleteModale]);

  // ? Fonctions
  /** //* Fonction pour fermer la modale avec la croix ou le bouton annuler
   * @param {boolean} isOpenDeleteModale - État de la modale
   * Au clic, on inverse l'état de la modale
   */
  const handleDeleteModale = () => {
    setIsOpenDeleteModale(!isOpenDeleteModale);
  };

  /** //! Accessibilité
   * @param {React.KeyboardEvent<HTMLDivElement>} event - Événement clavier
   * @param {boolean} isOpenDeleteModale - État de la modale
   * * Une div n'est pas un element clickable par défaut.
   * On ajoute un fonction d’accessibilité pour le clavier.
   * Si la touche enter ou espace est pressée, on appelle la fonction handleDeleteModale() juste au dessus.
   */
  const handleDeleteModaleKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>
  ) => {
    if (event.key === 'enter' || event.key === ' ') {
      handleDeleteModale();
    }
  };

  /** //* Fonction d'envoi du formulaire
   * @param {FormEvent<HTMLFormElement>} event - Événement formulaire
   * @param {boolean} isOpenDeleteModale - État de la modale
   * Au submit, on envoie les données du formulaire au serveur
   */
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // On empêche le comportement par défaut du formulaire
    setIsOpenDeleteModale(!isOpenDeleteModale); // On ferme la modale
    if (id !== null) {
      dispatch(logout()); // On déconnecte le membre
      dispatch(deleteMember(id.toString())); // On supprime le membre
      navigate('/'); // On redirige vers la page d'accueil
    }
  };

  // ? Rendu JSX
  return (
    <div className="DeleteModale">
      <div className="DeleteModale--container" ref={modalRef}>
        <div className="DeleteModale--container--head">
          <h2 className="DeleteModale--title">Suppression</h2>
          <div
            /** //? Bouton fermer la modale
             * @param {boolean} isOpenDeleteModale - État de la modale
             * @param {React.MouseEvent<HTMLDivElement>} event - Événement clic
             * @param {React.KeyboardEvent<HTMLDivElement>} event - Événement clavier
             * * Une div n'est pas un element clickable par défaut.
             * On ajoute tabindex={0} pour le rendre focusable.
             * et une fonction de déclenchement au clic ou au clavier
             */
            className="DeleteModale--close"
            role="button" // On précise que c'est un bouton
            tabIndex={0} // On précise que c'est un élément focusable
            onClick={handleDeleteModale}
            onKeyDown={handleDeleteModaleKeyDown}
          >
            X
          </div>
        </div>

        <form onSubmit={handleSubmit} className="DeleteModale--form">
          <h3>Voulez-vous vraiment supprimer votre compte ?</h3>
          <p>(Attention, cette action est irréversible.)</p>
          <div className="DeleteModale--form--submit">
            <button
              type="button"
              onClick={handleDeleteModale}
              className="DeleteModale--form--submit--cancel"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="DeleteModale--form--submit--confirm"
            >
              Supprimer mon compte
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DeleteModale;
