import { useRef, useEffect, FormEvent } from 'react';
import { useAppSelector, useAppDispatch } from '../../../hook/redux';
import { toggleModalLogin } from '../../../store/reducer/log';
import { loginUser } from '../../../store/reducer/user';
import Input from '../Input';
import FlashMessage from '../FlashMessage/FlashMessage';
import './style.scss';

function Login() {
  const modalLogin = useAppSelector((state) => state.log.modalLogin);
  const flash = useAppSelector((state) => state.user.login.flash);
  const isLogged = useAppSelector((state) => state.user.login.logged);
  const modalRef = useRef(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !(modalRef.current as Element).contains(event.target as Node)
      ) {
        dispatch(toggleModalLogin());
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dispatch]);

  const handleLogin = () => {
    dispatch(toggleModalLogin());
  };

  const handleLoginKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'enter' || event.key === ' ') {
      handleLogin();
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    dispatch(toggleModalLogin());
    dispatch(loginUser(formData));
  };

  return (
    <>
      {modalLogin && (
        <div className="Login">
          <div className="Login--container" ref={modalRef}>
            <div className="Login--container--head">
              <h2 className="Login--title">Connexion</h2>
              <div
                className="Login--close"
                role="button"
                tabIndex={0}
                onClick={handleLogin}
                onKeyDown={handleLoginKeyDown}
              >
                X
              </div>
            </div>

            <form className="Login--form" onSubmit={handleSubmit}>
              <Input
                name="email"
                type="email"
                placeholder="Adresse Email"
                className="Login--inputText"
              />
              <Input
                name="password"
                type="password"
                placeholder="Mot de passe"
                className="Login--inputText"
              />

              <button type="submit" className="Login--form--submit">
                Se connecter
              </button>
            </form>
            <p>DevsConnect</p>
          </div>
        </div>
      )}

      {flash && isLogged && (
        <FlashMessage type={flash.type} duration={flash.duration ?? 3000}>
          {flash.children}
          console.log({flash})
        </FlashMessage>
      )}
    </>
  );
}

export default Login;
