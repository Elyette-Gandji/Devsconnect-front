import LogComponent from '../LogComponent/LogComponent';
import LinksComponent from '../LinksComponent/LinksComponent';

import { useAppSelector } from '../../../../../hook/redux';

import Title from '../Title/Title';
import Login from '../../../../Form/Login/Login';
import Signin from '../../../../Form/Signin/signin';

function HeaderLarge() {
  const modalLogin = useAppSelector((state) => state.log.modalLogin);
  const modalSignin = useAppSelector((state) => state.log.modalSignin);
  return (
    <>
      <div className="Header">
        <div>
          <Title />
        </div>
        <LinksComponent />
        <LogComponent />
      </div>
      {modalLogin && <Login />}
      {modalSignin && <Signin />}
    </>
  );
}

export default HeaderLarge;
