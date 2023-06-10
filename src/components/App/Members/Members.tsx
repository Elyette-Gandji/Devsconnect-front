// Librairies
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../../hook/redux';

// Fonctions asynchrones
import { fetchAllMembers } from '../../../store/reducer/members';

// Composants
import FilterBar from '../Layout/FilterBar/FilterBar';
import CardMember from './CardMember';
import './style.scss';

function Members() {
  const dispatch = useAppDispatch();
  const members = useAppSelector((state) => state.members.list.data);
  const loading = useAppSelector((state) => state.members.list.loading); // Nouvelle variable loading

  useEffect(() => {
    dispatch(fetchAllMembers()).then(() => {
      console.log('then:', members);
    });
  }, [dispatch]);

  if (loading) {
    return <p>Loading...</p>; // Afficher un indicateur de chargement si les membres sont en cours de chargement
  }

  if (!Array.isArray(members)) {
    return <p>Error: Members data is not an array.</p>;
  }
  if (members.length === 0) {
    return <p>No members found.</p>;
  }

  return (
    <div className="Members">
      <FilterBar />
      <h2>Tous les membres</h2>
      <div className="Members--containerCard">
        {members.map((member) => (
          <CardMember key={member.id} member={member} />
        ))}
      </div>
    </div>
  );
}

export default Members;
