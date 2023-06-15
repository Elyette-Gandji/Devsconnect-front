import './style.scss';
import { Link } from 'react-router-dom';

import { ProjectI } from '../../../@types/interface';

interface CardProjectI {
  project: ProjectI;
}

function Project({ project }: CardProjectI) {
  const { id, title, description, availability } = project;
  const classname = availability ? 'project-open' : 'project-close';

  return (
    <Link to={`/projects/${id}`} className="project">
      <div className="project-left">
        <div className="project-title">
          <h1>{title}</h1>
        </div>

        <div className="project-technos">
          <div className="project-technos-containers">{project.technos}</div>
        </div>
      </div>
      <div className="project-description">
        <p>{description}</p>
      </div>
      <div className={classname}>
        <p>{availability ? 'Disponible' : 'Non disponible'}</p>
      </div>
    </Link>
  );
}

export default Project;
