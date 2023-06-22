import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import './style.scss';

import { useAppSelector, useAppDispatch } from '../../../../hook/redux';

import { fetchOneProject } from '../../../../store/reducer/projects';
import ErrorPage from '../../../../routes/ErrorPage';
import { fetchAllTags } from '../../../../store/reducer/tag';
import { fetchOneMember } from '../../../../store/reducer/members';
function ProjectDetail() {
  const { id } = useParams();

  const dispatch = useAppDispatch();
  const projectData = useAppSelector((state) => state.projects.project.data);
  const loading = useAppSelector((state) => state.projects.project.loading);
  const isUserLoggedIn = useAppSelector((state) => state.user.login.logged);
  const tags = useAppSelector((state) => state.tag.list.data);

  useEffect(() => {
    if (id) dispatch(fetchOneProject(Number(id)));
    dispatch(fetchAllTags());
  }, [dispatch, id]);
  console.log(projectData);
  const pseudo = projectData?.user_pseudo;
  const otherUsers = projectData?.users;
  console.log(pseudo);
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
        <h2>Créateur du projet :{pseudo}</h2>

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
            <ul>
              {otherUsers.map((user) => (
                <li key={user.user_id}>{user.pseudo}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="project-technos-container">
          <h2 className="technos-title">Technos utilisées</h2>
          <div className="project-technos-img"></div>
          {tags.map((tag: TagI) => (
            <span key={tag.id}>{tag.name}</span>
          ))}
        </div>
      </div>

      {isUserLoggedIn && (
        <Link to={`/modify-project/${id}`} className="modify-btn">
          Modifier le projet
        </Link>
      )}

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
