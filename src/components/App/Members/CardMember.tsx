import './style.scss';
import { technos } from '../../../data/technosPath';

function CardMember() {
  return (
    <div className="CardMember">
      <section className="CardMember--card">
        <div className="CardMember--card--header">
          <div className="CardMember--card--header--text">
            <h3>Lorraine Ipsum</h3>
            <p className="">Disponible</p>
          </div>
          <img src="/images/profil/profil.svg" alt="vite" />
        </div>
        <div className="CardMember--card--body">
          <p className="CardMember--card--body--text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio alias
            debitis magnam quo et laudantium temporibus dignissimos delectus
            dolor, iure repellendus nam possimus ullam? Lorem ipsum dolor sit
            amet, consectetur adipisicing elit. Vero, perspiciatis! Sunt illum
            incidunt ipsam aperiam, corporis vitae esse odio soluta molestias
            officia impedit obcaecati reprehenderit dolores deleniti minus alias
            saepe, voluptatibus nesciunt enim nihil minima dolorum culpa quidem
            autem. Alias.
          </p>
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
