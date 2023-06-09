import FilterBar from '../Layout/FilterBar/FilterBar';
import CardMember from './CardMember';
import './style.scss';

function Members() {
  return (
    <div className="Members">
      <FilterBar />
      <h2>Tous les membres</h2>
      <div className="Members--containerCard">
        <CardMember />
        <CardMember />
        <CardMember />
      </div>
    </div>
  );
}

export default Members;
