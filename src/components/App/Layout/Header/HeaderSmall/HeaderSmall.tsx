import { useState } from 'react';
import { useAppSelector } from '../../../../../hook/redux';

import Burger from './Burger/Burger';
import Title from '../Title/Title';
import LeftMenu from './LeftMenu/LeftMenu';
import Login from '../../../../Form/Login/Login';
import Signin from '../../../../Form/Signin/signin';

function HeaderSmall() {
  const modalLogin = useAppSelector((state) => state.log.modalLogin);
  const modalSignin = useAppSelector((state) => state.log.modalSignin);
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
      <LeftMenu isOpen={isOpen} setIsOpen={setIsOpen} />
      {modalLogin && <Login />}
      {modalSignin && <Signin />}
    </>
  );
}

export default HeaderSmall;
