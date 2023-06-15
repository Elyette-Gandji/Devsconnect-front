// ? Librairies
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

// ? Composants externes
import CustomSwitch from '../../../../utils/customSwitchUI';

// ? Styles
import './style.scss';
import SelectComponent from './Select/Select';

// ? Typage
import { MemberI, TagI } from '../../../../@types/interface';

function FilterBar({
  members,
  setFilteredMembers,
}: {
  members: MemberI;
  setFilteredMembers: any;
}) {
  //! States Redux
  const [checked, setChecked] = useState(false); // Sert à gérer le switch open to work
  const [searchParams, setSearchParams] = useSearchParams(); // Sert à récupérer les paramètres de l'url

  //! States local
  const [selectValue, setSelectValue] = useState([]); // Sert à stocker les technos sélectionnées
  //! Params url
  const searchText = searchParams.get('search') || ''; // Sert à récupérer la valeur du paramètre search de l'url

  //! Fonction pour le switch open to work
  // Si on clique sur le switch, on inverse le state checked
  const handleSwitch = () => {
    setChecked(!checked);
  };

  const handleTechnoChange = (selectedTechnos) => {
    setSelectValue(selectedTechnos);
    // Valeur de la techno sélectionnée récupéré depuis le composant <Select />
    // On l'enregistre dans selectValue
  };

  /* //! Fonction pour enregistrer la recherche dans l'url
  /  Fonction appelée à chaque fois que l'utilisateur tape dans le champ de recherche
  /  On récupère la valeur de la recherche (event.target.value)
  /  On utilise setSearchParams pour mettre à jour les paramètres de l'url
  */
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const results = event.target.value;
    setSearchParams({ search: results });
  };

  /* //! UseEffect pour filtrer les membres
  /  A chaque fois que `members`, `searchText` ou `setFilteredMembers` ou `selectValue` change, on fait une mise à jour des membres filtrés
  /  On met à jour les membres filtrés du composant parent <Membres />
  */
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

      //* Filtre par techno
      const technoResult =
        selectValue.length === 0 ||
        (member.tags &&
          // every pour que les filtres technos soient cumulatifs
          selectValue.every((techno) =>
            member.tags.some(
              (tag) => tag.name.toLowerCase() === techno.value.toLowerCase()
            )
          ));

      return textResult && available && technoResult;
    });
    // On met à jour les membres filtrés du composant parent <Membres />
    setFilteredMembers(filteredResults);
  }, [searchText, members, checked, selectValue, setFilteredMembers]);
  return (
    <div className="FilterBar">
      <h3 className="FilterBar--title">Filtrer les résultats</h3>
      <div className="FilterBar--container">
        <div className="FilterBar--firstField">
          <p className="FilterBar--firstField--text">Choix des technos :</p>
          <SelectComponent handleTechnoChange={handleTechnoChange} />
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
