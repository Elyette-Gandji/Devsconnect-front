import './style.scss';
import { technos } from '../../../data/technosPath';

function CardMember({ member }: { member: {} }) {
  // On récupère les données de member et key depuis Members.tsx {
  return (
    <div className="CardMember">
      <section className="CardMember--card">
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
            <li>Projet 1 : Lorem ipsum dolor sit amet.</li>
            <li>Projet 2 : Amet consectetur adipisicing elit.</li>
            <li>Projet 3 : Animi quis magni dolore iure?</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default CardMember;
