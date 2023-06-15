import { NavLink } from 'react-router-dom';

function LinksComponent() {
  return (
    <ul className="Header--ul">
      <li className="Header--ul--createProject">
        <NavLink to="/create-my-project">Créer mon projet</NavLink>
      </li>
      <li className="Header--ul--profiles">
        <NavLink to="/users">Les profils</NavLink>
      </li>
      <li className="Header--ul--project">
        <NavLink to="/projects">Les projets</NavLink>
      </li>
    </ul>
  );
}

export default LinksComponent;
