// Hook pour la lecture des state, avec typage inclus
import { useAppSelector } from '../../../../../hook/redux';

// Typage
import { BurgerI } from '../../../../../@types/interface';

// Composants
import LogComponent from '../LogComponent/LogComponent';
import LogoutComponent from '../LogoutComponent/LogoutComponent';
import LinksComponent from '../LinksComponent/LinksComponent';
import Title from '../Title/Title';
import Login from '../../../../Form/Login/Login';
import Signin from '../../../../Form/Signin/signin';

// Fonction principale
function HeaderLarge() {
  // On récupère les state des modales de connexion et d'inscription
  const modalLogin = useAppSelector((state) => state.log.modalLogin);
  const modalSignin = useAppSelector((state) => state.log.modalSignin);
  const isLogged = useAppSelector((state) => state.user.login.logged);

  return (
    <>
      <div className="Header">
        <div>
          <Title />
        </div>
        <LinksComponent />
        {isLogged ? (
          <LogoutComponent {...({} as BurgerI)} /> // On est sur du typage vu qu'on utilisera pas ces props, on force donc le typage
        ) : (
          <LogComponent {...({} as BurgerI)} /> // On est sur du typage vu qu'on utilisera pas ces props, on force donc le typage
        )}{' '}
      </div>
      {/* Si les modales sont true, on les affichent */}
      {modalLogin && <Login />}
      {modalSignin && <Signin />}
    </>
  );
}

export default HeaderLarge;
