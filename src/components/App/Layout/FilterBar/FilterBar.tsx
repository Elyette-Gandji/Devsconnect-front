// Librairies
import { useState } from 'react';

// Composants externes
import Select from 'react-select';
import { Switch } from '@mui/material';

// Datas
import technosOptions from '../../../../data/technosOptions';
// Styles
import './style.scss';

function FilterBar() {
  // State pour le check de open to work
  const [checked, setChecked] = useState(false);
  // State pour la selection des technos
  const [selectedTechnos, setSelectedTechnos] = useState<[]>([]);

  //! Fonction pour le choix des technos
  const handleOptionChange = (selected) => {
    if (selected.length <= 5) {
      setSelectedTechnos(selected);
    }
  };
  // Fonction pour désactiver les options si 5 technos sont sélectionnées
  const isOptionDisabled = () => selectedTechnos.length >= 5;

  //! Fonction pour le switch open to work
  const handleSwitch = () => {
    setChecked(!checked);
  };

  //! Fonction pour personnaliser le rendu des options
  //* Elle est appelée pour chaque option et recoit en paramètre un objet avec les propriétés label, value et icon
  //* Elle filtre le tableau de technos sélectionnées et si l'option est présente, elle n'affiche que le label et disparait de la liste déroulante.
  //* Sinon, elle affiche le label et l'icône (dans la liste déroulante).
  const formatOptionLabel = ({ label, value, icon }) => {
    if (selectedTechnos.some((option) => option.value === value)) {
      return label; // Afficher uniquement le label sans l'icône
    }
    return (
      <div>
        {icon}
        {label}
      </div>
    );
  };

  return (
    <div className="FilterBar">
      <div className="FilterBar--firstField">
        <p>Choix des technos:</p>
        <Select
          id="selectTechnos"
          isMulti // Choix multiple
          name="technos"
          options={technosOptions} // Tableau des technos (importé de data/technosOptions)
          className="FilterBar--firstField--select"
          maxMenuHeight={280} // Hauteur du menu déroulant (1 technos = 40px * 7 = 280px)
          placeholder="5 maximum"
          value={selectedTechnos} // Valeur de la sélection (voir state plus haut)
          onChange={handleOptionChange} // Fonction pour le choix des technos (voir fonction plus haut)
          isOptionDisabled={isOptionDisabled} // Désactive les options si 5 technos sont sélectionnées
          formatOptionLabel={formatOptionLabel} // Personnalisation du rendu des options (voir fonction plus haut)
        />
      </div>
      <div className="FilterBar--secondField">
        <input
          type="text"
          className="FilterBar--secondField--search"
          placeholder="Entrez votre recherche"
        />
        <label className="FilterBar--secondField--switch" htmlFor="openToWork">
          <em>Membres</em> ouvert aux propositions:
          <Switch id="openToWork" checked={checked} onChange={handleSwitch} />
        </label>
      </div>
    </div>
  );
}

export default FilterBar;
