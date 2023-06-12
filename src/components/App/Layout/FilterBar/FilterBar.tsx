// Librairies
import { useState } from 'react';

// Composants externes
import CustomSwitch from '../../../../utils/customSwitchUI';

// Styles
import './style.scss';
import SelectComponent from './Select/Select';

function FilterBar() {
  // State pour le check de open to work
  const [checked, setChecked] = useState(false);

  //! Fonction pour le switch open to work
  const handleSwitch = () => {
    setChecked(!checked);
  };

  return (
    <div className="FilterBar">
      <h3 className="FilterBar--title">Filtrer les résultats</h3>
      <div className="FilterBar--container">
        <div className="FilterBar--firstField">
          <p className="FilterBar--firstField--text">Choix des technos :</p>
          <SelectComponent />
        </div>
        <div className="FilterBar--secondField">
          <input
            type="text"
            className="FilterBar--secondField--search"
            placeholder="Entrez votre recherche"
          />
        </div>
        <div className="FilterBar--thirdField">
          <label className="FilterBar--thirdField--switch" htmlFor="openToWork">
            Disponible :
            <CustomSwitch
              className="FilterBar--thirdField--switch"
              checked={checked}
              onChange={handleSwitch}
            />
          </label>
        </div>
      </div>
    </div>
  );
}

export default FilterBar;
