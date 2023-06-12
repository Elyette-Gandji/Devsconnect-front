// ? Librairies
import { useState } from 'react';
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
  //! State pour le check de open to work
  const [checked, setChecked] = useState(false);
  //! Fonction pour le switch open to work
  const handleSwitch = () => {
    setChecked(!checked);
  };

  const [searchParams, setSearchParams] = useSearchParams();

  const searchText = searchParams.get('search') || '';

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const results = event.target.value;
    const filteredResults = results
      ? members.filter((member) => {
          return (
            member.name.toLowerCase().includes(results.toLowerCase()) ||
            member.firstname.toLowerCase().includes(results.toLowerCase())
          );
        })
      : members;
    setFilteredMembers(filteredResults);
    setSearchParams({ search: results });
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
