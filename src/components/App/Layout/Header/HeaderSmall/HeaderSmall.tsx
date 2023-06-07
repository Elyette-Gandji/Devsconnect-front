import { useState } from 'react';

import Burger from './Burger/Burger';
import Title from '../Title/Title';
import LeftMenu from './LeftMenu/LeftMenu';

function HeaderSmall(props) {
  const { modalLogin, setModalLogin, modalSignin, setModalSignin } = props;
  // isOpen est un state qui va nous permettre de savoir si le menu est ouvert ou non
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="Header">
        {/* On envoie la state isOpen au composant Burger pour qu'il puisse gérer son état */}
        <Burger isOpen={isOpen} setIsOpen={setIsOpen} />
        <Title />
      </div>
      {/* On envoie les props de l'ouverture du burger dans la gestion des modales connexions inscription */}
      <LeftMenu
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        modalLogin={modalLogin}
        setModalLogin={setModalLogin}
        modalSignin={modalSignin}
        setModalSignin={setModalSignin}
      />
    </>
  );
}

export default HeaderSmall;
