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
            dolor, iure repellendus nam possimus ullam?
          </p>
          <div className="CardMember--card--body--technos">
            <img src={technosPath.html} />
            <img src={technosPath.react} />
            <img src={technosPath.css} />
          </div>
        </div>
        <div className="CardMember--card--footer">
          <p>Projets :</p>
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
