// Link pour rediriger vers la page du membre
import { Link } from 'react-router-dom';

import './style.scss';
import { technos } from '../../../data/technosPath';

function CardMember({ member }: { member: {} }) {
  // On récupère les données de member et key depuis Members.tsx {
  return (
    <div className="CardMember">
      <section className="CardMember--card">
        {/* //? On utilise Link sur le header uniquement} */}
        <Link to={`/users/${member.id}`} key={member.id}>
          <div className="CardMember--card--header">
            <div className="CardMember--card--header--text">
              <h3>
                {member.firstname} {member.name}
              </h3>
              <p className={member.availability ? 'open' : 'close'}>
                {member.availability ? 'Disponible' : 'Indisponible'}
              </p>
            </div>
            <img src="/images/profil/profil.svg" alt="vite" />
          </div>
        </Link>
        <div className="CardMember--card--body">
          <p className="CardMember--card--body--text">{member.description}</p>
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
