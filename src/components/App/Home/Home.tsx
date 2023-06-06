import './style.scss';
import logo from './home_logo.png';

function Home() {
  return (
    <main className="Home">
      <img src={logo} alt="logo accueil" />
      <div className="Home__text">
        <p>
          Bienvenue sur notre plateforme de mise en relation dédiée aux
          développeurs passionnés. Ici vous pourrez trouver les talents dont
          vous avez besoin ou rejoindre des projets stimulants.
        </p>
        <p>
          Notre objectif est de faciliter la collaboration entre les
          développeurs et de favoriser l'émergence de projets innovants.
          Rejoignez notre communauté dès aujourd'hui et ouvrez la voie à de
          nouvelles opportunités dans le monde de la programmation. Trouvez les
          bonnes personnes, créez ensemble et réalisez vos ambitions
          technologiques.
        </p>
      </div>
    </main>
  );
}

export default Home;
