import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import './style.scss';

import { useAppSelector, useAppDispatch } from '../../../../hook/redux';

import { fetchOneProject } from '../../../../store/reducer/projects';
import { fetchAllTags } from '../../../../store/reducer/tag';
import {
  addParticipantToProject,
  deleteParticipantFromProject,
} from '../../../../store/reducer/participants';

import ErrorPage from '../../../../routes/ErrorPage';

function ProjectDetail() {
  const { id } = useParams();

  const dispatch = useAppDispatch();
  const projectData = useAppSelector((state) => state.projects.project.data);
  const loading = useAppSelector((state) => state.projects.project.loading);
  const isUserLoggedIn = useAppSelector((state) => state.user.login.logged);
  const userId = useAppSelector((state) => state.user.login.id);

  const [deletedParticipantId, setDeletedParticipantId] = useState(null);

  console.log(projectData);

  useEffect(() => {
    if (id) {
      dispatch(fetchOneProject(Number(id)));
    }
    dispatch(fetchAllTags());
  }, [dispatch, id]);

  const pseudo = projectData?.user_pseudo;
  const otherUsers = projectData?.users;
  const projectTags = projectData?.tags;

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

    dispatch(addParticipantToProject({ userId, projectId: id }))
      .then(() => {
        dispatch(fetchOneProject(Number(id)));
      })
      .catch((error) => {});
  };

  const handleDeleteParticipant = (participantId) => {
    setDeletedParticipantId(participantId);
    dispatch(
      deleteParticipantFromProject({ userId: participantId, projectId: id })
    )
      .then(() => {
        // La mise à jour sera gérée par useEffect
      })
      .catch((error) => {
        // Gérer l'erreur si nécessaire
      });
  };

  const removeDeletedParticipant = () => {
    if (deletedParticipantId) {
      const updatedOtherUsers = otherUsers.filter(
        (user) => user.user_id !== deletedParticipantId
      );
      return updatedOtherUsers;
    }
    return otherUsers;
  };

  const updatedOtherUsers = removeDeletedParticipant();

  return (
    <div>
      <button className="return-btn" type="button" onClick={handleReturn}>
        Retour
      </button>

      <div className="card">
        <div className="card-header">
          <h1 className="card-project-title">{projectData.title}</h1>
          <h2>Créateur du projet : {pseudo}</h2>

          <div className={classname}>
            <p className="project-status">
              {projectData.availability ? 'Disponible' : 'Non disponible'}
            </p>
          </div>
        </div>

        <div className="description-container">
          <div className="title-description-container">
            <h2 className="project-second-title">Description</h2>
            <p className="card-project-description">
              {projectData.description}
            </p>
            <div className="other-users-container">
              <h2 className="project-second-title">Participants</h2>
              {updatedOtherUsers && updatedOtherUsers.length > 0 ? (
                <ul className="all-lists">
                  {updatedOtherUsers.map((user) => (
                    <li className="other-user-list" key={user.user_id}>
                      {user.pseudo}
                      {userId === projectData.user_id &&
                        user.user_id !== userId && (
                          <button
                            className="delete-participant-btn"
                            type="button"
                            onClick={() =>
                              handleDeleteParticipant(user.user_id)
                            }
                          >
                            Supprimer
                          </button>
                        )}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="no-other-users">
                  Il n'y a pas encore de participants
                </p>
              )}
            </div>
          </div>

          <div className="project-technos-container">
            <h2 className="technos-title">Technos utilisées</h2>
            <div className="project-technos-img">
              {projectTags && projectTags.length > 0 ? (
                projectTags.map((tag) => (
                  <img
                    className="project-technos-img"
                    src={`/images/technos/${tag.tag_name.toLowerCase()}.svg`}
                    alt={tag.tag_name}
                    title={tag.tag_name}
                    key={tag.tag_id}
                  />
                ))
              ) : (
                <p>Aucune techno</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="button-container">
        {isUserLoggedIn && userId === projectData.user_id && (
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
    </div>
  );
}

export default ProjectDetail;
