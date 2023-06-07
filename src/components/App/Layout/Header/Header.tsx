import { useState, useEffect } from 'react';

import HeaderLarge from './HeaderLarge/HeaderLarge';
import HeaderSmall from './HeaderSmall/HeaderSmall';

import Login from '../../../Form/Login/Login';
import Signin from '../../../Form/Signin/signin';

import './style.scss';

function Header() {
  const [modalLogin, setModalLogin] = useState(false);
  const [modalSignin, setModalSignin] = useState(false);

  // On utilise la state windowWidth pour savoir la largeur de la fenêtre navigateur
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // On utilise useEffect pour mettre à jour la state windowWidth à chaque fois que la largeur de la fenêtre navigateur change
  useEffect(() => {
    const handleWindowResize = () => {
      // On met à jour la state windowWidth avec la nouvelle largeur de la fenêtre navigateur
      setWindowWidth(window.innerWidth);
    };
    // On ajoute un écouteur d'évènement sur le resize de la fenêtre navigateur
    window.addEventListener('resize', handleWindowResize);

    // On retourne une fonction de nettoyage pour supprimer l'écouteur d'évènement
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  // On retourne le composant HeaderLarge si la largeur de la fenêtre navigateur est supérieure à 768px
  // Sinon on retourne le composant HeaderSmall
  return (
    <div>
      {windowWidth > 768 ? (
        <HeaderLarge
          modalLogin={modalLogin}
          setModalLogin={setModalLogin}
          modalSignin={modalSignin}
          setModalSignin={setModalSignin}
        />
      ) : (
        <HeaderSmall
          modalLogin={modalLogin}
          setModalLogin={setModalLogin}
          modalSignin={modalSignin}
          setModalSignin={setModalSignin}
        />
      )}
      {modalLogin && <Login />}
      {modalSignin && <Signin />}
    </div>
  );
}

export default Header;
