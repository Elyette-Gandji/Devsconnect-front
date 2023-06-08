import { Link } from 'react-router-dom';

function LinksComponent() {
  return (
    <ul className="Header--ul">
      <li className="Header--ul--createProject"> Créer mon projet</li>
      <li className="Header--ul--profiles">Les profils</li>
      <li className="Header--ul--project">
        <Link to="/projects">Les projets</Link>
      </li>
    </ul>
  );
}

export default LinksComponent;
