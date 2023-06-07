import LogComponent from '../LogComponent/LogComponent';
import LinksComponent from '../LinksComponent/LinksComponent';

import Title from '../Title/Title';

function HeaderLarge(props) {
  const { modalLogin, setModalLogin, modalSignin, setModalSignin } = props;
  return (
    <div className="Header">
      <div>
        <Title />
      </div>
      <LinksComponent />
      <LogComponent
        modalLogin={modalLogin}
        setModalLogin={setModalLogin}
        modalSignin={modalSignin}
        setModalSignin={setModalSignin}
      />
    </div>
  );
}

export default HeaderLarge;
