import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../../hook/redux';

import { BurgerI } from '../../../../../@types/interface';

function LinksComponent(props: BurgerI) {
  const { setIsOpen } = props;

  const windowWidth = useAppSelector((state) => state.main.windowWidth);

  // Dispatch
  const dispatch = useAppDispatch();

  const handleClick = () => {
    if (windowWidth > 768) {
      return;
    }
    setIsOpen(false);
  };

  // * Une div n'est pas un element clickable
  // * Fonction d’accessibilité pour le clavier.
  // * Si la touche enter ou espace est pressée, on appelle la fonction handleClick()
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'enter' || event.key === ' ') {
      handleClick();
    }
  };

  return (
    <ul className="Header--ul">
      <div
        role="button"
        onKeyDown={handleKeyDown}
        tabIndex={0}
        onClick={handleClick}
        className="Header--ul--link"
      >
        <NavLink to="/create-my-project"> Créer mon projet</NavLink>
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
