import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import './style.scss';

import { useAppSelector, useAppDispatch } from '../../../../hook/redux';

import { fetchOneProject } from '../../../../store/reducer/projects';
import ErrorPage from '../../../../routes/ErrorPage';
import { technos } from '../../../../utils/technosPath';

function ProjectDetail() {
  const { id } = useParams();

  const dispatch = useAppDispatch();
  const projectData = useAppSelector((state) => state.projects.project.data);
  const loading = useAppSelector((state) => state.projects.project.loading);

  useEffect(() => {
    if (id) dispatch(fetchOneProject(Number(id)));
  }, [dispatch, id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!projectData) {
    return <ErrorPage />;
  }

  const classname = projectData.availability
    ? 'project-open-card'
    : 'project-close-card';

  const handleReturn = () => {
    window.history.back();
  };

  const isProjectAvailable = projectData.availability;

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
        <h1 className="card-project-title">{projectData.title}</h1>
        <h2>Créateur du projet</h2>

        <div className={classname}>
          <p className="project-status">
            {projectData.availability ? 'Disponible' : 'Non disponible'}
          </p>
        </div>
      </div>

      <div className="description-container">
        <div className="title-description-container">
          <h2 className="project-description-title">Description</h2>
          <p className="card-project-description">{projectData.description}</p>
          <div>
            <h1>Participants</h1>
          </div>
        </div>

        <div className="project-technos-container">
          <h2 className="technos-title">Technos utilisées</h2>
          <div className="project-technos-img"></div>
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
