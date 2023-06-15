import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../../../hook/redux';

import { fetchAllProjects } from '../../../../store/reducer/projects';

import { ProjectI } from '../../../../@types/interface';

import './style.scss';

function ProjectCard({ projectID }: { projectID: ProjectI }) {
  const project = useAppSelector(
    (state) =>
      state.projects.list.data.find(
        (projectFromApi) => projectFromApi.id === projectID.id
      )
    // ?  filtre le projet correspondant dans la liste complète des projets (state.projects.list.data)
    // ?  en utilisant l'ID du projet fourni dans les props (projectID.id).
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllProjects());
  }, [dispatch]);

  return (
    <Link to={`/projects/${project.id}`}>
      <div className="ProjectCard" key={project.id}>
        <div className="ProjectCard--firstField">
          <h4 className="ProjectCard--firstField--title">{project.title}</h4>
          <div className="ProjectCard--firstField--technos">
            {project.tags.slice(0, 4).map((tag) => (
              <img
                key={`${project.id}-${tag.id}`}
                src={`/images/technos/${tag.name.toLowerCase()}.svg`}
                alt={tag.name}
                title={tag.name}
              />
            ))}
          </div>
        </div>
        <div className="ProjectCard--secondField">
          <div className="ProjectCard--secondField--description">
            {project.description}
          </div>
        </div>
      </div>
    </Link>
  );
}
export default ProjectCard;
