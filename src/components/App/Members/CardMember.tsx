// Link pour rediriger vers la page du membre
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../hook/redux';

// Utils
import { technos } from '../../../utils/technosPath';

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
            <img src="/images/profil/profil.svg" alt="vite" />
          </div>
        </Link>
        <div className="CardMember--card--body">
          <p className="CardMember--card--body--text">{description}</p>
          <div className="CardMember--card--body--technos">
            {/* //! On importe toutes les données depuis data, on map dessus en dur et limite à 5 l'affichage */}
            {technos.slice(0, 5).map((techno) => (
              <img
                src={techno.path}
                alt={techno.label}
                title={techno.label}
                key={techno.id}
              />
            ))}
          </div>
        </div>
        <div className="CardMember--card--footer">
          <h4>Projets :</h4>
          {/* //! On map dessus en dur et limite à 3 l'affichage */}
          <ul className="CardMember--card--footer--list">
            <li>
              <span className="CardMember--card--footer--list--span">
                Projet 1 :
              </span>
              Lorem ipsum dolor sit amet.
            </li>
            <li>
              <span className="CardMember--card--footer--list--span">
                Projet 2 :
              </span>
              Amet consectetur adipisicing elit. Lorem ipsum, dolor sit amet
              consectetur adipisicing elit. Et vitae veritatis officiis,
              nostrum, repellendus facilis, dolorum voluptates repudiandae aut
              quos dicta accusamus itaque autem harum earum aperiam perspiciatis
              rem ab.
            </li>
            <li>
              <span className="CardMember--card--footer--list--span">
                Projet 3 :
              </span>
              Animi quis magni dolore iure?
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default CardMember;
