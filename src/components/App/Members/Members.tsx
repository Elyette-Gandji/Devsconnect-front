// Librairies
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../../hook/redux';

// Typage
import { MemberI } from '../../../@types/interface';

// Fonctions asynchrones
import { fetchAllMembers } from '../../../store/reducer/members';

// Composants
import NotFound from '../../NotFound/NotFound';
import FilterBar from '../Layout/FilterBar/FilterBar';
import CardMember from './CardMember';
import './style.scss';

function Members() {
  const dispatch = useAppDispatch();
  const members = useAppSelector((state) => state.members.list.data);
  const loading = useAppSelector((state) => state.members.list.loading); // Nouvelle variable loading

  useEffect(() => {
    dispatch(fetchAllMembers());
  }, [dispatch]);

  if (loading) {
    return <p>Loading...</p>; // Afficher un indicateur de chargement si les membres sont en cours de chargement
  }

  if (members.length === 0) {
    // ? Si la liste des membres est vide, on affiche une erreur 404 au composant NotFound
    return <NotFound errorMessage="Erreur 404" errorStatut={404} />;
  }

  return (
    <div className="Members">
      <FilterBar />
      <h2>Tous les membres</h2>
      <div className="Members--containerCard">
        {members.map((member: MemberI) => (
          <CardMember key={member.id} member={member} />
        ))}
      </div>
    </div>
  );
}

export default Members;
