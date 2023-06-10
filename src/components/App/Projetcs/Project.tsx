import './style.scss';
import { Link } from 'react-router-dom';

function Project({ project }) {
  return (
    <Link to={`/projects/${project.id}`} className="project">
      <div className="project-title">
        <h1>{project.title}</h1>
      </div>
      <div className="project-description">
        <p>{project.description}</p>
        <div className="project-technos">
          <p>{project.technos}</p>
        </div>
        <div className="project-open">
          <p>{project.open} </p>
        </div>
      </div>
    </Link>
  );
}

export default Project;
