import { useRef, useEffect, FormEvent } from 'react';

// Permet modifier le state et de relancer le rendu de ce composant à chaque fois que le state de la modale change
import { useNavigate } from 'react-router-dom';

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

  //! useNavigate
  const navigate = useNavigate();

  //! Si connecté, on ferme la modale
  useEffect(() => {
    if (isLogged) {
      dispatch(toggleModalLogin());
    }
  }, [isLogged, dispatch]);

  //! useEffect pour clic externe à la modale
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

    dispatch(loginUser(formData)); // Dispatch de l'action de connexion réussie
    navigate('/'); // Redirection vers la page d'accueil
  };

  return (
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

  );
}

export default Login;
