// ? Librairies
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

// ? Composants externes
import CustomSwitch from '../../../../utils/customSwitchUI';

// ? Styles
import './style.scss';
import SelectComponent from './Select/Select';

// ? Typage
import { MemberI } from '../../../../@types/interface';

function FilterBar({
  members,
  setFilteredMembers,
}: {
  members: MemberI;
  setFilteredMembers: any;
}) {
  //! States
  const [checked, setChecked] = useState(true); // Sert à gérer le switch open to work
  const [searchParams, setSearchParams] = useSearchParams(); // Sert à récupérer les paramètres de l'url
  const searchText = searchParams.get('search') || ''; // Sert à récupérer la valeur du paramètre search de l'url

  //! Fonction pour le switch open to work
  const handleSwitch = () => {
    setChecked(!checked);
  };

  //! Fonction pour enregistrer la recherche dans l'url
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const results = event.target.value;
    // On met à jour les paramètres de l'url avec la valeur de la recherche (event.target.value)
    setSearchParams({ search: results });
  };
  //! A chaque fois que `members`, `searchText` ou `setFilteredMembers` change, on fait une mise à jour des membres filtrés
  useEffect(() => {
    // On filtre sur tous les membres
    const filteredResults = members.filter((member) => {
      // on filtre le nom du membre par rapport à la valeur de la recherche
      const nameResult = member.name
        .toLowerCase()
        .includes(searchText.toLowerCase());
      // on filtre le prénom du membre par rapport à la valeur de la recherche
      const firstnameResult = member.firstname
        .toLowerCase()
        .includes(searchText.toLowerCase());

      //* Filtre par nom ou prénom
      const textResult = nameResult || firstnameResult;

      //* Filtre par disponibilité
      const available = !checked || member.availability;

      return textResult && available;
    });
    // On met à jour les membres filtrés du composant parent <Membres />
    setFilteredMembers(filteredResults);
  }, [searchText, members, checked, setFilteredMembers]);

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
            name="search"
            value={searchText}
            onChange={handleSearch}
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
