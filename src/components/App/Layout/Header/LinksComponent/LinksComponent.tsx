import { NavLink, Navigate, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../../hook/redux';

import { BurgerI } from '../../../../../@types/interface';
import { toggleModalLogin } from '../../../../../store/reducer/log';

function LinksComponent(props: BurgerI) {
  const { setIsOpen } = props;

  const windowWidth = useAppSelector((state) => state.main.windowWidth);
  const isLoggedIn = useAppSelector((state) => state.user.login.logged);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    if (windowWidth > 768) {
      return;
    }
    setIsOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleClick();
    }
  };

  const handleCreateProjectClick = () => {
    if (isLoggedIn) {
      navigate('/create-my-project');
    } else {
      dispatch(toggleModalLogin());
      navigate('/');
    }
  };

  return (
    <ul className="Header--ul">
      <div
        role="button"
        onKeyDown={handleKeyDown}
        tabIndex={0}
        onClick={handleCreateProjectClick}
        className="Header--ul--link"
      >
        {isLoggedIn ? (
          <Navigate to="/create-my-project" replace />
        ) : (
          <Navigate to="/" replace />
        )}
        <NavLink to="/create-my-project">Créer mon projet</NavLink>
      </div>
      <div
        role="button"
        onKeyDown={handleKeyDown}
        tabIndex={0}
        onClick={handleClick}
        className="Header--ul--link"
      >
        <NavLink to="/users">Les profils</NavLink>
      </div>
      <div
        role="button"
        onKeyDown={handleKeyDown}
        tabIndex={0}
        onClick={handleClick}
        className="Header--ul--link"
      >
        <NavLink to="/projects">Les projets</NavLink>
      </div>
    </ul>
  );
}

export default LinksComponent;
