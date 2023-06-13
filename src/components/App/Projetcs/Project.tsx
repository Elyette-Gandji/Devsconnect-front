import './style.scss';
import { Link } from 'react-router-dom';

function Project({ project }) {
  const classname = project.open ? 'project-open' : 'project-close';

  return (
    <Link to={`/projects/${project.id}`} className="project">
      <div className="project-left">
        <div className="project-title">
          <h1>{project.title}</h1>
        </div>

        <div className="project-technos">
          <div className="project-technos-containers">{project.technos}</div>
        </div>
      </div>
      <div className="project-description">
        <p>{project.description}</p>
      </div>
      <div className={classname}>
        <p>{project.open ? 'Disponible' : 'Non disponible'}</p>
      </div>
    </Link>
  );
}

export default Project;
