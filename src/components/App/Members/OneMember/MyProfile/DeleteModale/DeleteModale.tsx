// ? Librairie
import { useRef, useEffect, FormEvent } from 'react';
import { useAppSelector, useAppDispatch } from '../../../../../../hook/redux';

import { deleteMember } from '../../../../../../store/reducer/members';

// import FlashMessage from '../FlashMessage/FlashMessage';

// Styles
import './style.scss';

// ? Fonction
function DeleteModale({ isOpenDeleteModale, setIsOpenDeleteModale }) {
  const id = useAppSelector((state) => state.user.login.id); // id du membre connecté
  const flash = useAppSelector((state) => state.user.login.message);

  //! Ref pour la modale
  const modalRef = useRef(null);

  const dispatch = useAppDispatch();

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
        setIsOpenDeleteModale(!isOpenDeleteModale);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  //! Fonction pour fermer la modale avec la croix ou le bouton annuler
  const handleDeleteModale = () => {
    setIsOpenDeleteModale(!isOpenDeleteModale);
  };
  // * Une div n'est pas un element clickable
  // * Fonction d’accessibilité pour le clavier.
  // * Si la touche enter ou espace est pressée, on appelle la fonction handleClick()
  const handleDeleteModaleKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>
  ) => {
    if (event.key === 'enter' || event.key === ' ') {
      handleDeleteModale();
    }
  };

  //! Fonction pour soumettre le formulaire
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('delete envoyé');
    setIsOpenDeleteModale(!isOpenDeleteModale);
    dispatch(deleteMember(id));
  };
  return (
    <div className="DeleteModale">
      <div className="DeleteModale--container" ref={modalRef}>
        {/* {flash && (
          <FlashMessage type={flash.type} duration={flash.duration ?? 3000}>
            {flash.children}
          </FlashMessage>
        )} */}
        <div className="DeleteModale--container--head">
          <h2 className="DeleteModale--title">Suppression</h2>
          <div
            className="DeleteModale--close"
            role="button"
            tabIndex={0}
            onClick={handleDeleteModale}
            onKeyDown={handleDeleteModaleKeyDown}
          >
            X
          </div>
        </div>

        <form className="DeleteModale--form" onSubmit={handleSubmit}>
          <h3>Voulez-vous vraiment supprimer votre compte ?</h3>
          <p>(Attention, cette action est irréversible.)</p>
          <div className="DeleteModale--form--submit">
            <button
              type="submit"
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
