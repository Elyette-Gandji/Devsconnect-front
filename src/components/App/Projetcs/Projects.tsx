import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../../hook/redux';
import { fetchAllProjects } from '../../../store/reducer/projects';
import NotFound from '../../NotFound/NotFound';
import Project from './Project';

import { ProjectI } from '../../../@types/interface';

function Projects() {
  const dispatch = useAppDispatch();
  const projects = useAppSelector((state) => state.projects.list.data);
  const loading = useAppSelector((state) => state.projects.list.loading);
  const [filteredProjects, setFilteredProjects] =
    useState<ProjectII[]>(projects);

  useEffect(() => {
    dispatch(fetchAllProjects());
  }, [dispatch]);

  const handleReturn = () => {
    window.history.back();
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (projects.length === 0) {
    return <NotFound errorMessage="Erreur 404" errorStatut={404} />;
  }

  return (
    <div className="projects">
      <button className="return" type="button" onClick={handleReturn}>
        Retour
      </button>
      <div className="projects-flex">
        {projects.map((project) => (
          <Project project={project} key={project.id} />
        ))}
      </div>
    </div>
  );
}

export default Projects;
