import './style.scss';

function Header() {
  return (
    <div className="Header">
      <div>
        <p className="Header--brand">DevsConnect</p>
      </div>
      <div className="Header--nav">
        <p className="Header--nav--search">Rechercher</p>
        <p className="Header--nav--createProject"> Créer mon projet</p>
        <p className="Header--nav--profiles">Les profils</p>
        <p className="Header--nav--project">Les projets</p>
      </div>
      <div className="Header--nav--connect">
        <p className="Header--nav--connect--connection">Connexion</p>
        <p>Inscription</p>
      </div>
    </div>
  );
}

export default Header;
