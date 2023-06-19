// Librairies
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../../../hook/redux';

// Composants
import HeaderLarge from './HeaderLarge/HeaderLarge';
import HeaderSmall from './HeaderSmall/HeaderSmall';
import FlashMessage from '../../../Form/FlashMessage/FlashMessage';

// Actions du reducer
import { resizeWindow } from '../../../../store/reducer/main';

import './style.scss';

function Header() {
  // On récupère la state windowWidth du reducer main
  const windowWidth = useAppSelector((state) => state.main.windowWidth);
  const isLogged = useAppSelector((state) => state.user.login.logged);
  const flash = useAppSelector((state) => state.user.login.flash);

  // Dispatch
  const dispatch = useAppDispatch();

  // On utilise useEffect pour mettre à jour la state windowWidth à chaque fois que la largeur de la fenêtre navigateur change
  useEffect(() => {
    const handleWindowResize = () => {
      // On met à jour et on fait un nouveau rendu avec la nouvelle largeur de la fenêtre navigateur
      dispatch(resizeWindow());
    };
    // On ajoute un écouteur d'évènement sur le resize de la fenêtre navigateur
    window.addEventListener('resize', handleWindowResize);

    // On retourne une fonction de nettoyage pour supprimer l'écouteur d'évènement
    return () => window.removeEventListener('resize', handleWindowResize);
  }, [dispatch]);

  // On retourne le composant HeaderLarge si la largeur de la fenêtre navigateur est supérieure à 768px
  // Sinon on retourne le composant HeaderSmall
  return (
    <div>
      {isLogged && (
        <FlashMessage type={flash.type} duration={flash.duration ?? 3000}>
          {flash.children}
        </FlashMessage>
      )}
      {flash && (
        <FlashMessage type={flash.type} duration={flash.duration ?? 3000}>
          {flash.children}
        </FlashMessage>
      )}
      {}
      {windowWidth > 768 ? <HeaderLarge /> : <HeaderSmall />}
    </div>
  );
}

export default Header;
