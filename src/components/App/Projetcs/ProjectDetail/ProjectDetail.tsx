import { useParams } from 'react-router-dom';
import { list } from '../../../../assets/projects-list';
import './style.scss';

function ProjectDetail() {
  const { id } = useParams();

  const project = list.find((p) => p.id === parseInt(id));

  if (!project) {
    return <div>Projet non trouvé</div>;
  }

  const classname = project.open ? 'project-open-card' : 'project-close-card';

  const handleReturn = () => {
    window.history.back();
  };

  const isProjectAvailable = project.open;

  const handleApply = () => {
    if (!isProjectAvailable) {
      return;
    }
  };

  return (
    <div className="card">
      <button className="return-btn" type="button" onClick={handleReturn}>
        Retour
      </button>

      <div className="card-header">
        <h1 className="card-project-title">{project.title}</h1>
        <h2>Créateur du projet</h2>

        <div className={classname}>
          <p className="project-status">
            {project.open ? 'Disponible' : 'Non disponible'}
          </p>
        </div>
      </div>

      <div className="description-container">
        <div className="title-description-container">
          <h2 className="project-description-title">Description</h2>
          <p className="card-project-description">{project.description}</p>
          <div>
            <h1>Participants</h1>
          </div>
        </div>

        <div className="project-technos-container">
          <h2 className="technos-title">Technos utilisées</h2>
          <div className="project-technos-img">{project.technos}</div>
        </div>
      </div>

      <button
        className="apply-btn"
        type="button"
        disabled={!isProjectAvailable}
        onClick={handleApply}
      >
        Postuler au projet
      </button>
    </div>
  );
}

export default ProjectDetail;
