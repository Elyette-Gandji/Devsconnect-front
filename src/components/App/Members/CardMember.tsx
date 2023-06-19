// Link pour rediriger vers la page du membre
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../hook/redux';

// Typage
import { MemberI } from '../../../@types/interface';

import './style.scss';

interface CardMemberI {
  member: MemberI;
}

function CardMember({ member }: CardMemberI) {
  const userId = useAppSelector((state) => state.user.login.id);
  const { id, firstname, name, availability, description } = member;

  //! variable pour verifier si la page est celle de l'utilisateur connecté
  const profilePath =
    // ? Si l'id du membre recherché (id) est égal à l'id de l'utilisateur connecté (userId), on redirige vers la page profil
    id === userId ? `/profil` : `/users/${id}`;

  // On récupère les données de member et key depuis Members.tsx {
  return (
    <div className="CardMember">
      <section className="CardMember--card">
        {/* //? On utilise Link sur le header uniquement} */}
        <Link to={profilePath} key={id}>
          <div className="CardMember--card--header">
            <div className="CardMember--card--header--text">
              <h3>
                {firstname} {name}
              </h3>
              <p className={availability ? 'open' : 'close'}>
                {availability ? 'Disponible' : 'Indisponible'}
              </p>
            </div>
            <img
              src="/images/profil/profil.svg"
              alt="profil"
              title={member.pseudo}
            />
          </div>
        </Link>
        <div className="CardMember--card--body">
          <p className="CardMember--card--body--text">{description}</p>
          <div className="CardMember--card--body--technos">
            {member.tags && member.tags.length > 0 ? (
              member.tags.map((tag) => (
                <img
                  src={`/images/technos/${tag.name.toLowerCase()}.svg`}
                  alt={tag.name}
                  title={tag.name}
                  key={tag.id}
                />
              ))
            ) : (
              <p>Aucune techno</p>
            )}
          </div>
        </div>
        <div className="CardMember--card--footer">
          <h4>Projets :</h4>
          {/* //! On map dessus en dur et limite à 3 l'affichage */}
          <ul className="CardMember--card--footer--list">
            {member.projects && member.projects.length > 0 ? (
              member.projects.slice(0, 3).map((project) => (
                <Link key={project.id} to={`/projects/${project.id}`}>
                  <li key={project.id}>- {project.title}</li>
                </Link>
              ))
            ) : (
              <li>Aucun projet</li>
            )}
          </ul>
        </div>
      </section>
    </div>
  );
}

export default CardMember;
