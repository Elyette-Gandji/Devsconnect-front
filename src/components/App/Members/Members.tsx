// ? Librairies
import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../../hook/redux';

// ? Fonctions externes
import { fetchAllMembers } from '../../../store/reducer/members';

// ? Composants
import NotFound from '../../NotFound/NotFound';
import FilterBar from '../Layout/FilterBar/FilterBar';
import CardMember from './CardMember';

// ? Styles
import './style.scss';

// ? Interface globale
import { MemberI } from '../../../@types/interface';

// ? Fonction principales
function Members() {
  // ? States
  // Store
  const members: MemberI[] = useAppSelector((state) => state.members.list.data); // Variable members pour stocker les membres en provenance du store
  const loading = useAppSelector((state) => state.members.list.loading); // Variable loading pour stocker le statut de chargement des membres

  // local
  const [filteredMembers, setFilteredMembers] = useState<MemberI[]>(members); // Variable filteredMembers pour stocker les membres filtrés en provenance du composant FilterBar

  // ? Dispatch
  const dispatch = useAppDispatch();

  // ? useEffect
  // useEffect pour récupérer les membres
  useEffect(() => {
    dispatch(fetchAllMembers());
  }, [dispatch]);

  // En cas de chargement des membres, on affiche un indicateur de chargement
  if (loading) {
    return <p>Loading...</p>;
  }

  // Si la liste des membres est vide, on affiche une erreur 404 au composant NotFound
  if (members.length === 0) {
    return <NotFound errorMessage="Erreur 404" errorStatut={404} />;
  }

  // ? Rendu JSX
  return (
    <div className="Members">
      {/**
       * //! Barre de recherche
       * @param {Array} members - Liste des membres
       * @param {Function} setFilteredMembers - Fonction pour mettre à jour la liste des membres filtrés
       * On envoie au composant la liste des membres
       * On envoie au composant la fonction pour mettre à jour la liste des membres filtrés
       */}
      <FilterBar members={members} setFilteredMembers={setFilteredMembers} />

      <h2 className="Members--title">Tous les membres</h2>
      {filteredMembers.length === 0 && (
        <p className="noResult">Aucun résultat pour vos critères</p>
      )}
      <div className="Members--containerCard">
        {/* On map sur la liste en retour de la barre de recherche pour les cartes members */}
        {filteredMembers.map((member: MemberI) => (
          <CardMember key={member.id} member={member} />
        ))}
      </div>
    </div>
  );
}

export default Members;
