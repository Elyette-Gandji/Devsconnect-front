import './style.scss';
import technosPath from '../../../data/technosPath';

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
            {/*     
            //! Map() pour limiter à 5 l'affichage des technos de l'appel API
            <div>
              {data.map((item, index) => {
                if (index < 5) {
                  return <li key={index}>{item}</li>;
                }
                return null;
              })}
            </div> 
            */}
            <img src={technosPath.html} />
            <img src={technosPath.react} />
            <img src={technosPath.css} />
            <img src={technosPath.javascript} />
            <img src={technosPath.nodejs} />
          </div>
        </div>
        <div className="CardMember--card--footer">
          <h4>Projets :</h4>
          <ul className="CardMember--card--footer--list">
            <li>Lorem ipsum dolor sit amet.</li>
            <li>Amet consectetur adipisicing elit.</li>
            <li>Animi quis magni dolore iure?</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default CardMember;
