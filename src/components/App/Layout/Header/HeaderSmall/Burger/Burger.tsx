// Typage
import { BurgerI } from '../../../../../../@types/interface';

import './style.scss';

// * On récupère isOpen et setIsOpen depuis HeaderSmall
function Burger(props: BurgerI) {
  const { isOpen, setIsOpen } = props;

  const handleClick = () => {
    setIsOpen(!isOpen);
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
    <div
      className={`burger ${isOpen ? 'open' : ''}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button" //! On donne un role de bouton à la div (pour l'accessibilité)
      tabIndex={0} //! On rend la div focusable (pour l'accessibilité)
    >
      <div className={`btn ${isOpen ? 'active' : ''}`}>
        <div className="lines" />
        <div className="lines" />
        <div className="lines" />
      </div>
    </div>
  );
}

export default Burger;
