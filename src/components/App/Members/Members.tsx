import FilterBar from '../Layout/FilterBar/FilterBar';
import CardMember from './CardMember';
import './style.scss';

function Members() {
  return (
    <div className="Members">
      <FilterBar />
      <h2>Tous les membres</h2>
      <div className="Members--containerCard">
        <CardMember />
        <CardMember />
        <CardMember />
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
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
              alias debitis magnam quo et laudantium temporibus dignissimos
              delectus dolor, iure repellendus nam possimus ullam?
            </p>
            <p className="CardMember--card--body--text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
              alias debitis magnam quo et laudantium temporibus dignissimos
              delectus dolor, iure repellendus nam possimus ullam?
            </p>
            <p className="CardMember--card--body--text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
              alias debitis magnam quo et laudantium temporibus dignissimos
              delectus dolor, iure repellendus nam possimus ullam?
            </p>
          </div>
          <div className="CardMember--card--footer">
            <p>Projets :</p>
            <ul className="CardMember--card--footer--list">
              <li>Lorem ipsum dolor sit amet.</li>
              <li>Amet consectetur adipisicing elit.</li>
              <li>Animi quis magni dolore iure?</li>
            </ul>
          </div>
        </section>{' '}
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
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
              alias debitis magnam quo et laudantium temporibus dignissimos
              delectus dolor, iure repellendus nam possimus ullam?
            </p>
          </div>
          <div className="CardMember--card--footer">
            <p>Projets :</p>
            <ul className="CardMember--card--footer--list">
              <li>Lorem ipsum dolor sit amet.</li>
              <li>Amet consectetur adipisicing elit.</li>
              <li>Animi quis magni dolore iure?</li>
            </ul>{' '}
            <ul className="CardMember--card--footer--list">
              <li>Lorem ipsum dolor sit amet.</li>
              <li>Amet consectetur adipisicing elit.</li>
              <li>Animi quis magni dolore iure?</li>
            </ul>{' '}
            <ul className="CardMember--card--footer--list">
              <li>Lorem ipsum dolor sit amet.</li>
              <li>Amet consectetur adipisicing elit.</li>
              <li>Animi quis magni dolore iure?</li>
            </ul>{' '}
            <ul className="CardMember--card--footer--list">
              <li>Lorem ipsum dolor sit amet.</li>
              <li>Amet consectetur adipisicing elit.</li>
              <li>Animi quis magni dolore iure?</li>
            </ul>
          </div>
        </section>
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
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
              alias debitis magnam quo et laudantium temporibus dignissimos
              delectus dolor, iure repellendus nam possimus ullam?
            </p>
          </div>
          <div className="CardMember--card--footer">
            <p>Projets :</p>
            <ul className="CardMember--card--footer--list">
              <li>Lorem ipsum dolor sit amet.</li>
              <li>Amet consectetur adipisicing elit.</li>
              <li>Animi quis magni dolore iure?</li>
            </ul>{' '}
            <ul className="CardMember--card--footer--list">
              <li>Lorem ipsum dolor sit amet.</li>
              <li>Amet consectetur adipisicing elit.</li>
              <li>Animi quis magni dolore iure?</li>
            </ul>{' '}
            <ul className="CardMember--card--footer--list">
              <li>Lorem ipsum dolor sit amet.</li>
              <li>Amet consectetur adipisicing elit.</li>
              <li>Animi quis magni dolore iure?</li>
            </ul>{' '}
            <ul className="CardMember--card--footer--list">
              <li>Lorem ipsum dolor sit amet.</li>
              <li>Amet consectetur adipisicing elit.</li>
              <li>Animi quis magni dolore iure?</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Members;
